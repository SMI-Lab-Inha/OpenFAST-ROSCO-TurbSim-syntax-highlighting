import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import onigurumaPkg from "vscode-oniguruma";
import pkg from "vscode-textmate";

const { createOnigScanner, createOnigString, loadWASM } = onigurumaPkg;
const { Registry } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const grammarPath = path.join(repoRoot, "syntaxes", "openfast.tmLanguage.json");
const casesPath = path.join(repoRoot, "tests", "grammar-cases.json");
const onigWasmPath = path.join(
  repoRoot,
  "node_modules",
  "vscode-oniguruma",
  "release",
  "onig.wasm"
);

async function loadGrammar() {
  const wasm = await fs.readFile(onigWasmPath);
  await loadWASM(wasm.buffer);

  const registry = new Registry({
    onigLib: Promise.resolve({
      createOnigScanner,
      createOnigString
    }),
    async loadGrammar(scopeName) {
      if (scopeName !== "source.openfast") {
        return null;
      }

      const rawGrammar = JSON.parse(await fs.readFile(grammarPath, "utf8"));
      return rawGrammar;
    }
  });

  return registry.loadGrammar("source.openfast");
}

function findOverlappingTokens(tokens, startIndex, expectedText) {
  const endIndex = startIndex + expectedText.length;

  return tokens.filter((token) => {
    const overlapsStart = token.startIndex < endIndex;
    const overlapsEnd = token.endIndex > startIndex;
    return overlapsStart && overlapsEnd;
  });
}

function formatScopes(scopes) {
  return scopes.join(" > ");
}

// Lines tokenized before the case line. The default skips past the two-line
// file-opening heading; a case can override it to test document-start behavior.
const defaultPreamble = ["! preamble", "! preamble"];

function tokenizeCase(grammar, line, preamble = defaultPreamble) {
  let ruleStack = null;

  for (const preambleLine of preamble) {
    const result = grammar.tokenizeLine(preambleLine, ruleStack);
    ruleStack = result.ruleStack;
  }

  return grammar.tokenizeLine(line, ruleStack);
}

async function main() {
  const grammar = await loadGrammar();
  const testCases = JSON.parse(await fs.readFile(casesPath, "utf8"));
  let failures = 0;

  if (!grammar) {
    throw new Error("Failed to load the source.openfast grammar.");
  }

  for (const testCase of testCases) {
    const { line, expectations, preamble } = testCase;
    const { tokens } = tokenizeCase(grammar, line, preamble);

    for (const expectation of expectations) {
      const { text, scopeIncludes, scopeExcludes } = expectation;
      const startIndex = line.indexOf(text);

      if (startIndex === -1) {
        failures += 1;
        console.error(`Missing expected text "${text}" in line: ${line}`);
        continue;
      }

      const matchingTokens = findOverlappingTokens(tokens, startIndex, text);

      if (matchingTokens.length === 0) {
        failures += 1;
        console.error(`No token found for "${text}" in line: ${line}`);
        continue;
      }

      // scopeExcludes: no token covering the text may carry this scope.
      if (scopeExcludes) {
        const offending = matchingTokens.filter((token) =>
          token.scopes.includes(scopeExcludes)
        );

        if (offending.length > 0) {
          failures += 1;
          console.error(
            [
              `Expected "${text}" not to include scope "${scopeExcludes}"`,
              `Line: ${line}`,
              `Actual scopes: ${offending
                .map((token) => formatScopes(token.scopes))
                .join(" | ")}`
            ].join("\n")
          );
        }
      }

      if (!scopeIncludes) {
        continue;
      }

      const hasExpectedScope = matchingTokens.some((token) =>
        token.scopes.includes(scopeIncludes)
      );

      if (!hasExpectedScope) {
        failures += 1;
        console.error(
          [
            `Expected "${text}" to include scope "${scopeIncludes}"`,
            `Line: ${line}`,
            `Actual scopes: ${matchingTokens
              .map((token) => formatScopes(token.scopes))
              .join(" | ")}`
          ].join("\n")
        );
      }
    }
  }

  if (failures > 0) {
    process.exitCode = 1;
    console.error(`\n${failures} grammar expectation(s) failed.`);
    return;
  }

  console.log(`Validated ${testCases.length} grammar case(s) successfully.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

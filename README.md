# OpenFAST, ROSCO & TurbSim Syntax Highlighting

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=SMI-Lab.openfast-rosco-syntax-highlighting)

Unofficial VS Code extension for OpenFAST, ROSCO, and TurbSim input and output files.

## Features

- Syntax highlighting for OpenFAST-style text input files such as `.fst`, `.dat`, `.in`, `.inp`, `.out`, `.ipt`, `.ech`, `.wnd`, `.sum`, `.bmi`, and `.lin`
- Support for common OpenFAST module files including AeroDyn, ElastoDyn, HydroDyn, InflowWind, MoorDyn, ServoDyn, SeaState, and related driver files
- Support for ROSCO-style `DISCON.in` controller files
- Support for TurbSim input files (`.inp`, and `.in`)
- Highlighting for:
  - file title lines, section banners, and `END` markers
  - booleans and special values like `default`, `unused`, and `none`
  - quoted strings, file paths, and unquoted string values like `FATAL` or `RK4`
  - table column headers and units rows
  - integers, decimals, and scientific notation
  - parameter names in the common `value  parameter  - description` layout
  - `!` comments and trailing inline descriptions

## Installation

**From the VS Code Marketplace (recommended):**

1. Open VS Code.
2. Go to the Extensions view (`Ctrl+Shift+X`).
3. Search for **OpenFAST ROSCO Syntax Highlighting**.
4. Click **Install**.

**From a `.vsix` file:**

1. Download the `.vsix` file from the [Releases](https://github.com/SMI-Lab-Inha/OpenFAST-ROSCO-TurbSim-syntax-highlighting/releases) page.
2. Open VS Code and go to the Extensions view (`Ctrl+Shift+X`).
3. Click the `...` menu at the top right and select **Install from VSIX...**.
4. Select the downloaded file.

Once installed, any file with a supported extension (`.fst`, `.dat`, `.in`, `.inp`, etc.) will be highlighted automatically.

## Scope

The grammar is built from real OpenFAST, ROSCO, and TurbSim sample files, not from a generic INI or config grammar.

It is designed to make engineering input decks easier to read without trying to fully parse every module format.

## Included Files

- `syntaxes/openfast.tmLanguage.json`
- `language-configuration.json`
- `media/icon.png`

## Development

1. Install dependencies with `npm install`.
2. Run `npm run test:grammar` to check the TextMate grammar against representative sample lines.
3. Open this folder in Visual Studio Code.
4. Press `F5` to launch an Extension Development Host.
5. Open an OpenFAST or ROSCO input file in the new window and verify highlighting.

## Tests

The project includes a minimal grammar regression script in `scripts/test-grammar.mjs`.

- Test cases live in `tests/grammar-cases.json`
- Each case checks that a representative line tokenizes with the expected TextMate scope
- Add a new case whenever you fix a highlighting bug or add support for a new OpenFAST-family pattern

Run the checks with:

```bash
npm run test:grammar
```

## Packaging

To package for sharing or publication:

1. Install dependencies with `npm install`
2. Run the grammar checks with `npm run test:grammar`
3. Run `npm run package:vsix`

Generated `.vsix` files are local build artifacts and should not be committed.

## Notes

- Because `.dat` and `.in` are generic extensions, this extension may also match non-OpenFAST files if enabled globally.
- ROSCO YAML files are intentionally not claimed by this extension because standard YAML support in VS Code is usually the better default.

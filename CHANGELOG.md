# Changelog

## 0.1.0

- The first two lines of a file (banner + title line) are now both highlighted as headings; previously only the first line was, leaving numbers like `15` in `IEA 15 MW ...` picked out on line 2
- Section banners with a trailing note, e.g. `---- FLOATING PLATFORM ---- [unused with WaveMod=6]`, are now recognized as headings
- Free text after an inline `!` is highlighted as a comment again (it had been left unstyled since 0.0.7), while parameter names inside `! Name - description` keep their own color
- The remark after `END` (e.g. `END of input file (the word "END" must appear ...)`) is now a comment instead of being tokenized as strings and numbers
- En dash (`–`) is accepted as a description separator, as used in SeaState files
- Unquoted string values such as `FATAL`, `ALL`, `RANLUX`, `RK4`, and `AF05_BL.txt` are highlighted as strings
- Table headers now allow `*` in column names (MoorDyn `CG*`, `I*`, `CdA*`) and may be followed by a `!` remark or a `[...]` note
- OpenFAST/MoorDyn output preambles (`Predictions were generated ...`, `linked with ...`, `These predictions were generated ...`) are highlighted as headings
- An unterminated `"` no longer spills string highlighting onto following lines
- Added 16 grammar regression cases covering the fixes above
- Added `bugs`/`homepage` links to the manifest and stopped shipping `.gitignore` inside the VSIX

## 0.0.9

- Added a lightweight grammar regression test suite for representative OpenFAST, ROSCO, MoorDyn, and linearization patterns
- Improved contributor and packaging documentation for local validation and VSIX builds
- Reduced the marketplace icon size so packaging completes without the large-icon warning

## 0.0.8

- Added support for OpenFAST linearization output files (`.lin`)
- Linearization file header lines (e.g. `Simulation time: 400.0 s`) are now recognized and highlighted as headings

## 0.0.7

- Fixed inline `!` comment handling: parameter names inside `! ParameterName - description` style lines are now highlighted correctly while the description remains styled as a comment

## 0.0.6

- Fixed inline `!` comments: now the full comment text after `!` is highlighted, not just the `!` character itself

## 0.0.5

- Fixed `parameter-names` falsely matching identifiers before negative numbers (e.g. `fixed` before `-837.8`)
- Added `vessel` and `Pinned` to MoorDyn keywords; made MoorDyn keyword matching case-insensitive
- Fixed `table-headers` to recognize column names containing `/` and `.` (e.g. `BA/-zeta`)

## 0.0.4

- Added TurbSim to extension name, description, and keywords

## 0.0.3

- Improved highlighting for OpenFAST output (`.out`) files
- Added recognition of output file description/metadata header lines (e.g. `Description from the FAST input file: ...`)

## 0.0.2

- Added VTK parameter keywords: `WrVTK`, `VTK_type`, `VTK_fields`, `VTK_fps`
- Added distinct highlighting for quoted special values: `"default"`, `"unused"`, `"none"`, `"True"`, `"False"`
- Fixed `{...}` and `[...]` blocks inside trailing descriptions now highlighted correctly instead of being consumed as plain comment text

## 0.0.1

- Initial release
- Added VS Code language registration for OpenFAST-style input files
- Added TextMate grammar for OpenFAST and ROSCO input syntax
- Added language configuration for comments, brackets, and quotes
- Added marketplace icon and extension metadata

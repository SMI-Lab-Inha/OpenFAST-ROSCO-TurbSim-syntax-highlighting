# Changelog

## 0.2.0

- Units in descriptions and comments, such as `(m)`, `(kg m^2)`, `(N-m/rad)`, `[rad/s]`, `[m^2/s^2]`, and `[-]`, get their own unit color; units rows (including ROSCO's `[m/s]` style) use the same color
- Option lists are now read as key/label pairs: `{0=None; 1=SubDyn}`, `{1: RK4, 2: AB4}`, ROSCO's `(0: off, 1: 1P reductions)` and `[0- unused, 1- User defined]`, and DISCON's unbracketed `- 0: write no debug files, 1: ...`. The explanatory text in notes such as `[used only when VSContrl=0 and GenModel=2]` stays description-colored instead of every word being colored as an option
- References to other inputs inside notes (`PCMode` in `[unused when PCMode=0]`, `NumBl < 3`, `PropPot/=0`) are highlighted as parameters, with the comparison operator picked out
- Quoted choices inside descriptions (`("IECKAI","IECVKM", or "NONE")`, `(or "default")`) are highlighted as strings
- ROSCO and airfoil section banners such as `!------- SIMULATION CONTROL -----` and `! ------` are headings, matching `----` banners elsewhere
- AeroDyn sub-headings like `--- Skew correction` are headings
- Words in data tables (MoorDyn line types, rod and point names such as `poly_181`, `R2A`, `pt`) are highlighted as values; a lone `-` placeholder is a constant
- Commas in list values (`0.0, 0.0, 0.0`, `30.0, 60.0`) are separators
- `#` comment lines (ROSCO `Cp_Ct_Cq` performance tables) are comments
- Files that start with a column-header row (MoorDyn per-line `.out`, ROSCO `.RO.dbg`) no longer have that row painted as a title heading
- Inline `!` comments: a spaced dash in the middle of the comment text (e.g. `[0.85 - 0.95]`) no longer turns the rest of the line into a description
- A bracket closed with the wrong character (`[must currently be FALSE)`) no longer spills highlighting onto the next lines
- Space-separated numbers in quotes (`"13.750000 0.040000"`) are no longer mistaken for file paths
- Registered `.dvr` driver files, ROSCO debug output (`*.RO.dbg`, `*.RO.dbg2`, `*.RO.dbg3`), and `Cp_Ct_Cq*.txt` performance tables
- The grammar test runner accepts `scopeExcludes` to assert that a scope is absent; added 22 regression cases

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

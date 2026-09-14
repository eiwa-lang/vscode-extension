# vscode-eiwa

[Eiwa](https://github.com/eiwa-lang/eiwa-lang) language support for
[Visual Studio Code](https://code.visualstudio.com/).

## Features

- Syntax highlighting for `.ei` files (`source.eiwa` TextMate grammar):
  composition type system (`type`, `contract`, `skill`, first-class `enum`),
  `object`/`lib`/`test` blocks, lambda-style `for`, string interpolation
  (`$var`, `${expr}`), annotations, union types (`Int | Null`), `of` map pairs
- Bracket matching and auto-closing pairs
- Comment toggling (`//` and `/* */`)
- Indentation rules and `/** */` doc-comment continuation on Enter

## Relationship with tree-sitter-eiwa

VSCode highlights via TextMate grammars, not tree-sitter, so this extension
ships its own `syntaxes/eiwa.tmLanguage.json`. It is kept in sync with the
canonical [tree-sitter-eiwa](https://github.com/eiwa-lang/tree-sitter) grammar
(which powers the [Zed extension](https://github.com/eiwa-lang/zed-extension))
by porting `queries/highlights.scm` scopes and `grammar.js` keywords.

## Installing (dev)

1. Clone this repository.
2. Run `code --install-extension eiwa-0.1.0.vsix` after packaging with
   `npx @vscode/vsce package`, or press `F5` in this folder to launch an
   Extension Development Host.

## Limitations

- No language server (LSP) yet: no autocomplete, go-to-definition or diagnostics.

# vscode-eiwa

[Eiwa](https://github.com/eiwa-lang/eiwa-lang) language support for
[Visual Studio Code](https://code.visualstudio.com/).

## Features

- Eiwa language server (`eiwa-lsp`, stdio LSP 3.17) built into the extension
  host: hover, go-to-definition (same-file, imports, implicit stdlib,
  `Type.method`, synthesized `toString`/`equals`/`hashCode`), find
  implementations, document symbols, and whole-path import links
  (`textDocument/documentLink`)
- Syntax highlighting for `.ei` files (`source.eiwa` TextMate grammar):
  composition type system (`type`, `contract`, `skill`, first-class `enum`),
  `object`/`lib`/`test` blocks, lambda-style `for`, string interpolation
  (`$var`, `${expr}`), annotations, union types (`Int | Null`), `of` map pairs
- Bracket matching and auto-closing pairs
- Comment toggling (`//` and `/* */`)
- Indentation rules and `/** */` doc-comment continuation on Enter

## Requirements

The `eiwa-lsp` server binary (built from the
[Eiwa compiler repo](https://github.com/eiwa-lang/eiwa-lang), `lsp/` →
`eiwa build` produces `eiwa-lsp`, also shipped in every
[Eiwa release](https://github.com/eiwa-lang/eiwa/releases)). Put it on your
`PATH`, or set its location in settings:

```jsonc
{ "eiwa-lsp.path": "/abs/path/to/eiwa-lsp" }
```

`EIWAC` env (or `eiwac` on `PATH`) is used for diagnostics, `EIWA_SRC`
overrides the stdlib location — same as the Zed setup.

## Relationship with tree-sitter-eiwa

VSCode highlights via TextMate grammars, not tree-sitter, so this extension
ships its own `syntaxes/eiwa.tmLanguage.json`. It is kept in sync with the
canonical [tree-sitter-eiwa](https://github.com/eiwa-lang/tree-sitter) grammar
(which powers the [Zed extension](https://github.com/eiwa-lang/zed-extension))
by porting `queries/highlights.scm` scopes and `grammar.js` keywords.

## Installing (dev)

1. Clone this repository.
2. Run `npm install && npm run compile` (or press `F5` in this folder to
   launch an Extension Development Host).
3. Run `code --install-extension eiwa-lang-0.2.0.vsix` after packaging with
   `npx @vscode/vsce package`.

## Publishing

Pushing a `v*` tag runs the marketplace workflow (`vscode:prepublish`
rebuilds `dist/` before `vsce publish`).

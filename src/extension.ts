import * as vscode from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

function serverOptions(): ServerOptions {
  const command = vscode.workspace
    .getConfiguration('eiwa-lsp')
    .get<string>('path', 'eiwa-lsp');
  const run = { command, transport: TransportKind.stdio };
  return { run, debug: run };
}

function clientOptions(): LanguageClientOptions {
  return {
    documentSelector: [{ scheme: 'file', language: 'eiwa' }],
    synchronize: {
      // Re-check diagnostics when the project manifest changes.
      fileEvents: vscode.workspace.createFileSystemWatcher(
        '**/eiwa.{yaml,freeze}'
      ),
    },
  };
}

export function activate(context: vscode.ExtensionContext): void {
  client = new LanguageClient(
    'eiwa-lsp',
    'Eiwa Language Server',
    serverOptions(),
    clientOptions()
  );
  void client.start();

  // Pick up a changed server path without forcing a window reload.
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async (e) => {
      if (e.affectsConfiguration('eiwa-lsp.path') && client) {
        await client.stop();
        client = new LanguageClient(
          'eiwa-lsp',
          'Eiwa Language Server',
          serverOptions(),
          clientOptions()
        );
        await client.start();
      }
    })
  );
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}

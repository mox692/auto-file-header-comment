import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Listen for newly created files…
  context.subscriptions.push(
    vscode.workspace.onDidCreateFiles(async (event) => {
      for (const uri of event.files) {
        // only JS files
        if (uri.fsPath.endsWith(".js")) {
          // open, insert at top
          const doc = await vscode.workspace.openTextDocument(uri);
          const editor = await vscode.window.showTextDocument(doc);
          const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
          await editor.edit((edit) => {
            edit.insert(new vscode.Position(0, 0), `// Created on ${date}\n\n`);
          });
        }
      }
    })
  );
}

export function deactivate() {}

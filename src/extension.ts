'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { removeDeclaration } from './remove-declaration';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated


    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.fixImports', () => {
        // The code you place here will be executed every time your command is executed

        let document = vscode.window.activeTextEditor.document;
        let text = document.getText();
        let match: RegExpMatchArray = text.match(/(import {.+} from ".+)\/(src|typings)[\/\w]*"/)
        let replacement = match[0].replace(/\/(src|typings)[\/\w]*"/, "\"");
        let start = match.index;
        let length = match[0].length;

        let range = new vscode.Range(
            document.positionAt(start),
            document.positionAt(start + length));

        const edit = new vscode.WorkspaceEdit();

        edit.replace(document.uri, range, replacement);

        vscode.workspace.applyEdit(edit);

    });

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable2 = vscode.commands.registerCommand('extension.removeDeclarations', () => {
        // The code you place here will be executed every time your command is executed

        let document = vscode.window.activeTextEditor.document;
        let text = document.getText();
        const replacement = removeDeclaration(text);
        let range = new vscode.Range(
            document.positionAt(0),
            document.positionAt(Infinity),
            // document.positionAt(start),
            // document.positionAt(start + length)
        );

        const edit = new vscode.WorkspaceEdit();

        edit.replace(document.uri, range, replacement);

        vscode.workspace.applyEdit(edit);

    });

    context.subscriptions.push(disposable, disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
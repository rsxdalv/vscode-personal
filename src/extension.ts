'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { removeDeclaration } from './remove-declaration';
import { cleanTask, cleanQuokka, cleanTaskAnswers } from './clean-task';
import clipboardy = require('clipboardy');

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

    let disposable3 = vscode.commands.registerCommand('extension.cleanTask', () => {
        let document = vscode.window.activeTextEditor.document;
        const selection = vscode.window.activeTextEditor.selection;
        let text = document.getText(selection);
        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, selection, cleanTask(text));
        vscode.workspace.applyEdit(edit);
    });

    let disposable4 = vscode.commands.registerCommand('extension.cleanQuokka', () => {
        const text = clipboardy.readSync();
        clipboardy.writeSync(cleanQuokka(text));
        vscode.commands.executeCommand("editor.action.clipboardPasteAction");
    });

    let disposable5 = vscode.commands.registerCommand('extension.cleanTaskClipboard', () => {
        const text = clipboardy.readSync();
        clipboardy.writeSync(cleanTask(text));
        vscode.commands.executeCommand("editor.action.clipboardPasteAction");
    });

    let cleanTaskAnswers_ = vscode.commands.registerCommand('extension.cleanTaskAnswers', () => {
        const text = clipboardy.readSync();
        clipboardy.writeSync(cleanTaskAnswers(text));
        vscode.commands.executeCommand("editor.action.clipboardPasteAction");
    });

    let disposable6 = vscode.commands.registerCommand('extension.deleteTag', () => {
        vscode.commands.executeCommand("editor.emmet.action.balanceOut");
        let document = vscode.window.activeTextEditor.document;
        const selection = vscode.window.activeTextEditor.selection;
        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, selection, "");
        vscode.workspace.applyEdit(edit);
    });

    let disposable7 = vscode.commands.registerCommand('extension.quickSnippet', () => {
        const selections = vscode.window.activeTextEditor.selections;
        const snippet = new vscode.SnippetString("<QuestionHelper index={${1}} />");
        vscode.window.activeTextEditor.insertSnippet(snippet, selections);
        setTimeout(() => { vscode.commands.executeCommand("extension.textPastry.0toX"); }, 30);
    });

    context.subscriptions.push(
        disposable, 
        disposable2,
        disposable3,
        disposable4,
        disposable5,
        disposable6,
        disposable7,
        cleanTaskAnswers_,
    );
}

// this method is called when your extension is deactivated
export function deactivate() {
}
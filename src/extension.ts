import * as vscode from "vscode";
import { UPDATE_DELAY } from "./constants";
import { createDecoratorManager } from "./decorator";

export function activate(context: vscode.ExtensionContext) {
	let timeout: NodeJS.Timeout | undefined;
	let activeEditor = vscode.window.activeTextEditor;
	const decoratorManager = createDecoratorManager();

	function triggerUpdateDecorations(throttle?: boolean) {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}

		if (throttle) {
			timeout = setTimeout(() => decoratorManager.updateDecorations(activeEditor), UPDATE_DELAY);
		} else {
			decoratorManager.updateDecorations(activeEditor);
		}
	}

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	const subscriptions = [
		vscode.window.onDidChangeActiveTextEditor((editor) => {
			activeEditor = editor;
			if (editor) {
				triggerUpdateDecorations();
			}
		}),

		vscode.workspace.onDidChangeTextDocument((event) => {
			if (activeEditor && event.document === activeEditor.document) {
				triggerUpdateDecorations(true);
			}
		}),
	];

	context.subscriptions.push(...subscriptions);
}

// export function deactivate() { }
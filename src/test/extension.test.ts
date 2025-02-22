import * as assert from 'assert';
import * as vscode from 'vscode';
import { createDecoratorManager } from '../decorator';
import { calculateRange, createOklchDecoration } from '../utils';

suite('OKLCH Preview Extension', () => {
	const waitForDecoration = () => new Promise(resolve => setTimeout(resolve, 500));

	test('Utils - calculateRange returns correct range', () => {
		const match = 'oklch(0.5 0.2 30)'.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
		const range = calculateRange(0, match!, '0.5', '0.2', '30');

		assert.strictEqual(range.start.line, 0);
		assert.strictEqual(range.start.character, 7);
		assert.strictEqual(range.end.character, 17);
	});

	test('Utils - createOklchDecoration creates valid decoration', () => {
		const decoration = createOklchDecoration('0.5', '0.2', '30');
		assert.ok(decoration);
		// Clean up
		decoration.dispose();
	});

	test('Decorator - should not process unsupported languages', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: 'oklch(0.5 0.2 30)',
			language: 'plaintext'
		});
		const editor = await vscode.window.showTextDocument(document);
		const decoratorManager = createDecoratorManager();

		decoratorManager.updateDecorations(editor);
		await waitForDecoration();

		// Clean up
		await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
	});

	test('Decorator - should process supported languages', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: 'color: oklch(0.5 0.2 30);',
			language: 'css'
		});
		const editor = await vscode.window.showTextDocument(document);
		const decoratorManager = createDecoratorManager();

		decoratorManager.updateDecorations(editor);
		await waitForDecoration();

		// Clean up
		decoratorManager.clearDecorations();
		await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
	});
});
import * as vscode from "vscode";
import { OKLCH_REGEX, SUPPORTED_LANGUAGES } from "./constants";
import { createOklchDecoration, calculateRange, isFileSupported } from "./utils";

export function createDecoratorManager() {
    let decorationTypes: vscode.TextEditorDecorationType[] = [];

    function clearDecorations() {
        decorationTypes.forEach((d) => d.dispose());
        decorationTypes = [];
    }

    function updateDecorations(editor: vscode.TextEditor | undefined) {
        if (!editor || !isFileSupported(editor.document)) {
            return;
        }

        clearDecorations();
        const document = editor.document;

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            const matches = line.text.matchAll(OKLCH_REGEX);

            for (const match of matches) {
                const [, l, c, h, opacity] = match;
                const range = calculateRange(i, match, l, c, h, opacity);
                const decorationType = createOklchDecoration(l, c, h, opacity);

                decorationTypes.push(decorationType);
                editor.setDecorations(decorationType, [{ range }]);
            }
        }
    }

    return {
        updateDecorations,
        clearDecorations,
    };
}
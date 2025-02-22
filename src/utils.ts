import * as vscode from "vscode";

export function createOklchDecoration(l: string, c: string, h: string): vscode.TextEditorDecorationType {
    const oklchColor = `oklch(${l} ${c} ${h})`;
    return vscode.window.createTextEditorDecorationType({
        backgroundColor: oklchColor,
        borderRadius: "2px",
        color: Number(l) > 0.5 ? "#000000" : "#ffffff",
    });
}

export function calculateRange(
    lineIndex: number,
    match: RegExpMatchArray,
    l: string,
    c: string,
    h: string
): vscode.Range {
    const valueStartIndex = match.index! + (match[0].length - `${l} ${c} ${h}`.length);
    const startPos = new vscode.Position(lineIndex, valueStartIndex);
    const endPos = new vscode.Position(lineIndex, valueStartIndex + `${l} ${c} ${h}`.length);
    return new vscode.Range(startPos, endPos);
}
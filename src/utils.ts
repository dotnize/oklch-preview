import * as vscode from "vscode";
import { SUPPORTED_LANGUAGES } from './constants';

export function normalizePercentage(value: string): string {
    if (value.endsWith('%')) {
        return (parseFloat(value) / 100).toString();
    }
    return value;
}

export function createOklchDecoration(l: string, c: string, h: string, opacity?: string): vscode.TextEditorDecorationType {
    const normalizedL = normalizePercentage(l);
    const normalizedC = normalizePercentage(c);
    let oklchColor = `oklch(${normalizedL} ${normalizedC} ${h}`;

    // Add opacity if provided
    if (opacity) {
        const normalizedOpacity = normalizePercentage(opacity);
        oklchColor += ` / ${normalizedOpacity})`;
    } else {
        oklchColor += ')';
    }

    return vscode.window.createTextEditorDecorationType({
        backgroundColor: oklchColor,
        borderRadius: "2px",
        color: Number(normalizedL) > 0.5 ? "#000000" : "#ffffff",
    });
}

export function calculateRange(
    lineIndex: number,
    match: RegExpMatchArray,
    l: string,
    c: string,
    h: string,
    opacity?: string
): vscode.Range {
    let valueContent = `${l} ${c} ${h}`;

    // Add 'deg' if it was in the original match
    if (match[0].includes('deg')) {
        valueContent += 'deg';
    }

    // Add opacity if present
    if (opacity) {
        valueContent += ` / ${opacity}`;
    }

    const valueStartIndex = match.index! + (match[0].length - valueContent.length);
    const startPos = new vscode.Position(lineIndex, valueStartIndex);
    const endPos = new vscode.Position(lineIndex, valueStartIndex + valueContent.length);
    return new vscode.Range(startPos, endPos);
}

export function getAdditionalFilePatterns(): string[] {
    return vscode.workspace.getConfiguration('oklchPreview').get('additionalFilePatterns', []);
}

export function isFileSupported(document: vscode.TextDocument): boolean {
    // Check if the language ID is in the supported languages
    if (SUPPORTED_LANGUAGES.includes(document.languageId)) {
        return true;
    }

    // Check if the file matches any of the additional patterns
    const additionalPatterns = getAdditionalFilePatterns();
    if (additionalPatterns.length > 0) {
        const filePath = document.fileName;
        return additionalPatterns.some(pattern => {
            // Convert glob pattern to regex pattern
            const regexPattern = new RegExp(
                pattern
                    .replace(/\./g, '\\.')
                    .replace(/\*/g, '.*')
                    .replace(/\?/g, '.')
            );
            return regexPattern.test(filePath);
        });
    }

    return false;
}
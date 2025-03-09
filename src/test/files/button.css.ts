// import { style, createVar } from '@vanilla-extract/css';

const createVar = {} as any;
const style = {} as any;

// Color variables
const primaryColor = createVar('primary-color');
const accentColor = createVar('accent-color');

export const vars = {
    colors: {
        primary: primaryColor,
        accent: accentColor
    }
};

export const button = style({
    backgroundColor: 'oklch(0.6 0.2 240)',
    color: 'oklch(0.9 0.03 90)',
    ':hover': {
        backgroundColor: 'oklch(0.5 0.25 250)',
    },
    boxShadow: '0 2px 4px oklch(0.3 0.1 270)',
    vars: {
        [primaryColor]: 'oklch(0.7 0.15 200)',
        [accentColor]: 'oklch(0.85 0.3 60)',
    }
});

export const secondaryButton = style({
    backgroundColor: vars.colors.accent,
    border: '2px solid oklch(0.5 0.2 130)',
});
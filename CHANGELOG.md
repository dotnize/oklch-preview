## [0.4.0] - 2025-03-21

- Only show previews for colors wrapped in `oklch()`
- Fixed text color visibility issues for low opacity values

## [0.3.1] - 2025-03-14

- Added support for hue values in degrees and opacity values ([#8](https://github.com/dotnize/oklch-preview/pull/8))

## [0.3.0] - 2025-03-09

- Added support for configuring additional file patterns, such as CSS-in-JS files ([#6](https://github.com/dotnize/oklch-preview/pull/6))

  ```json
  "oklchPreview.additionalFilePatterns": [
    "**/*.css.ts",
    "**/*.styles.ts",
    "**/*.styled.tsx"
  ]
  ```

## [0.2.0] - 2025-03-01

- Added support for SASS files ([#4](https://github.com/dotnize/oklch-preview/issues/4))

## [0.1.3] - 2025-02-27

- Lowered minimum required VS Code version to ^1.96 for Cursor compatibility ([#3](https://github.com/dotnize/oklch-preview/issues/3))

## [0.1.0] - 2025-02-23

- Added support for lightness percentage values ([#1](https://github.com/dotnize/oklch-preview/issues/1))

## [0.0.2] - 2025-02-22

- Updated extension display name to OKLCH Color Preview

## [0.0.1] - 2025-02-22

- Initial release

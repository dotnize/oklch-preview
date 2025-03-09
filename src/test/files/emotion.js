/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const base = css`
  background-color: oklch(0.98 0.02 90);
  color: oklch(0.2 0.05 270);
`;

const buttonStyles = css`
  ${base}
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: oklch(0.55 0.2 250);
  color: oklch(1 0 0);

  &:hover {
    background-color: oklch(0.5 0.25 250);
  }
`;

// Dynamic styles with OKLCH
const getColorStyles = (variant) => css`
  color: ${variant === "primary"
    ? "oklch(0.95 0.01 0)"
    : "oklch(0.2 0.04 270)"};
  background-color: ${variant === "primary"
    ? "oklch(0.6 0.25 210)"
    : "oklch(0.9 0.05 90)"};
`;

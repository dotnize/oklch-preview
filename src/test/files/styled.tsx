// import styled from "styled-components";

const styled = {} as any;

// Theme with OKLCH colors
const theme = {
  colors: {
    primary: "oklch(0.65 0.3 10)",
    secondary: "oklch(0.75 0.25 230)",
    background: "oklch(0.98 0.01 90)",
    text: "oklch(0.2 0.02 270)",
  },
};

export const Button = styled.button`
  background-color: ${(props: any) =>
    props.primary ? "oklch(0.7 0.3 30)" : "oklch(0.9 0.05 270)"};
  color: oklch(0.95 0.01 0);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: oklch(0.6 0.25 40);
    box-shadow: 0 3px 5px oklch(0.3 0.05 270 / 0.3);
  }
`;

export const Card = styled.div`
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  border: 1px solid oklch(0.8 0.1 270);
`;

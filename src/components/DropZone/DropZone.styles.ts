import { CSSProperties } from "react";

export const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#888",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#999",
  outline: "none",
  transition: "border .24s ease-in-out",
};

export const focusedStyle: CSSProperties = {
  borderColor: "#2196f3",
};

export const acceptStyle: CSSProperties = {
  borderColor: "#00e676",
};

export const rejectStyle: CSSProperties = {
  borderColor: "#ff1744",
};

import React from "react";

export type InputVariant = "filled" | "outlined" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputFieldProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  type?: "text" | "password";
  loading?: boolean;
}

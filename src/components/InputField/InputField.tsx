import React, { useId } from "react";
import clsx from "clsx";
import type { InputFieldProps, InputVariant, InputSize } from "./InputField.types";

const base = "w-full rounded-xl transition shadow-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed";
const sizeMap: Record<InputSize, string> = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-5 py-3"
};
const variantMap: Record<InputVariant, string> = {
  filled: "bg-gray-100 dark:bg-gray-800 border border-transparent focus:bg-white focus:border-blue-600",
  outlined: "bg-transparent border border-gray-300 dark:border-gray-700 focus:border-blue-600",
  ghost: "bg-transparent border border-transparent focus:border-blue-600"
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  loading
}) => {
  const id = useId();
  const describedBy: string | undefined = [
    helperText ? `${id}-help` : null,
    invalid && errorMessage ? `${id}-err` : null
  ].filter(Boolean).join(" ") || undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          type={type}
          className={clsx(base, sizeMap[size], variantMap[variant], invalid && "border-red-500 focus:border-red-600 pr-10")}
        />

        {loading && (
          <span className="absolute inset-y-0 right-3 inline-flex items-center">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" opacity="0.25"/>
              <path d="M22 12a10 10 0 0 1-10 10" />
            </svg>
          </span>
        )}

        {invalid && (
          <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-red-600">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M11 7h2v6h-2zm0 8h2v2h-2z"/></svg>
          </span>
        )}
      </div>

      {helperText && (
        <p id={`${id}-help`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}

      {invalid && errorMessage && (
        <p id={`${id}-err`} className="mt-1 text-xs font-medium text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

export default InputField;

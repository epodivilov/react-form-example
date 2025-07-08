import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

export type ButtonVariant = "filled" | "outlined" | "text";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = "filled",
  children,
  disabled = false,
  isLoading = false,
  className = "",
  ...buttonProps
}: ButtonProps) {
  const buttonClassName = [styles.button, styles[variant], disabled || isLoading ? styles.disabled : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...buttonProps} className={buttonClassName} disabled={disabled || isLoading}>
      {isLoading ? "Loading..." : children}
    </button>
  );
}

import { useId } from "react";
import styles from "./form-field.module.css";

export interface FormFieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  error?: string;
}
export function FormField({ label, error, ...props }: FormFieldProps) {
  const errorTextId = useId();

  return (
    <label className={styles.root}>
      <span>{label}</span>
      <input {...props} className={styles.input} aria-invalid={error != null} aria-errormessage={errorTextId} />
      {error && (
        <div id={errorTextId} className={styles.error}>
          {error}
        </div>
      )}
    </label>
  );
}

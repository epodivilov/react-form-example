import { useAsync } from "../../shared/hooks/use-async";
import { FormField } from "../../shared/ui/form-field";
import { Button } from "../../shared/ui/button";
import { isFieldError, isCommonError, createFieldError, extractFormData } from "../../shared/lib";
import styles from "./login.module.css";

interface VerifyCodeStepProps {
  email: string;
  onSubmit: (code: string) => Promise<void>;
  onBack: () => void;
}

export function VerifyCodeStep({ email, onSubmit, onBack }: VerifyCodeStepProps) {
  const { execute, status, error, reset } = useAsync(async (e: React.FormEvent) => {
    e.preventDefault();
    const { code } = extractFormData<{ code: string }>(e.target as HTMLFormElement);

    if (!code) {
      throw createFieldError("code", "Code is required");
    }

    if (code.length !== 6) {
      throw createFieldError("code", "Code must be 6 digits");
    }

    await onSubmit(code);
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <p className={styles.disclaimer}>
        Enter the code sent to <strong>{email}</strong>.
      </p>

      <form onSubmit={execute} onInput={reset} noValidate className={styles.form}>
        <FormField
          label="Code"
          name="code"
          type="text"
          autoComplete="off"
          placeholder="Example: 123456"
          disabled={status === "pending"}
          error={isFieldError(error) && error.cause.field === "code" ? error.cause.message : undefined}
          autoFocus
          maxLength={6}
          minLength={6}
          inputMode="numeric"
        />

        {isCommonError(error) && <div className={styles.error}>{error.message}</div>}

        <Button type="submit" variant="filled" disabled={status === "pending"} isLoading={status === "pending"}>
          Verify Code
        </Button>
        <Button type="button" variant="text" onClick={onBack}>
          Back to email
        </Button>
      </form>
    </div>
  );
}

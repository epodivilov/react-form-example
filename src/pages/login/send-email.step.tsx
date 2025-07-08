import { useAsync } from "../../shared/hooks/use-async";
import { FormField } from "../../shared/ui/form-field";
import { Button } from "../../shared/ui/button";
import { isFieldError, isCommonError, createFieldError, extractFormData } from "../../shared/lib";
import styles from "./login.module.css";

interface SendEmailStepProps {
  onSubmit: (email: string) => Promise<void>;
}

export function SendEmailStep({ onSubmit }: SendEmailStepProps) {
  const { execute, status, error, reset } = useAsync(async (e: React.FormEvent) => {
    e.preventDefault();
    const { email } = extractFormData<{ email: string }>(e.target as HTMLFormElement);

    if (!email) {
      throw createFieldError("email", "Email is required");
    }

    if (!email.includes("@")) {
      throw createFieldError("email", "Invalid email address");
    }

    await onSubmit(email);
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <p className={styles.disclaimer}>
        We'll send a code to your email address. Enter the code to access your account instantly.
      </p>

      <form onSubmit={execute} onInput={reset} noValidate className={styles.form}>
        <FormField
          label="Email address"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Example: john@example.com"
          disabled={status === "pending"}
          error={isFieldError(error) && error.cause.field === "email" ? error.cause.message : undefined}
          autoFocus
        />

        {isCommonError(error) && <div className={styles.error}>{error.message}</div>}

        <Button type="submit" variant="filled" disabled={status === "pending"} isLoading={status === "pending"}>
          Send email
        </Button>
      </form>
    </div>
  );
}

export interface FieldError extends Error {
  cause: {
    field: string;
    message: string;
  };
}

export function isFieldError(error?: Error | null): error is FieldError {
  return (
    error != null &&
    error.cause != null &&
    typeof error.cause === "object" &&
    "field" in error.cause &&
    "message" in error.cause
  );
}

export function isCommonError(error?: Error | null): error is Error {
  return error != null && !isFieldError(error);
}

export function createFieldError(field: string, message: string): FieldError {
  return new Error(message, {
    cause: {
      field,
      message,
    },
  }) as FieldError;
}

export function extractFormData<T>(form: HTMLFormElement): T {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries()) as T;
}

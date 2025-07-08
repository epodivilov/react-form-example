import type { AuthService, SendEmailRequest, SendCodeRequest, AuthResult, User } from "../../shared/types/auth";

const RESTRICTED_EMAILS = ["restricted@email.com", "blocked@example.com", "forbidden@test.com"];

const VALID_CODE = "123456";
const STORAGE_KEY = "auth_user";
const CURRENT_EMAIL_KEY = "current_email";

function generateRandomId() {
  return Math.random().toString(36).substring(2, 15);
}

export class MockAuthService implements AuthService {
  async sendEmail(request: SendEmailRequest): Promise<AuthResult> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email } = request;

    // Check if email is restricted
    if (RESTRICTED_EMAILS.includes(email)) {
      return {
        success: false,
        error: "This email address is restricted",
      };
    }

    // Store current email for code verification
    localStorage.setItem(CURRENT_EMAIL_KEY, email);

    return {
      success: true,
      user: {
        id: generateRandomId(),
        email,
        name: email.split("@")[0],
      },
    };
  }

  async sendCode(request: SendCodeRequest): Promise<AuthResult> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const { email, code } = request;

    // Verify code
    if (code !== VALID_CODE) {
      return {
        success: false,
        error: "Invalid code",
      };
    }

    // Verify email matches the one used in sendEmail
    const storedEmail = localStorage.getItem(CURRENT_EMAIL_KEY);
    if (storedEmail !== email) {
      return {
        success: false,
        error: "Email mismatch",
      };
    }

    const user = {
      id: generateRandomId(),
      email,
      name: email.split("@")[0],
    };

    // Complete authentication
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.removeItem(CURRENT_EMAIL_KEY);

    return {
      success: true,
      user,
    };
  }

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CURRENT_EMAIL_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    const userData = localStorage.getItem(STORAGE_KEY);

    if (!userData) {
      return null;
    }

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
}

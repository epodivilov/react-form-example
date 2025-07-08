import { useState } from "react";
import { useAuth } from "../../features/auth";
import { SendEmailStep } from "./send-email.step";
import { VerifyCodeStep } from "./verify-code.step";

export function LoginPage() {
  const [step, setStep] = useState<"send-email" | "verify-code">("send-email");
  const [currentEmail, setCurrentEmail] = useState<string>("");

  const { sendEmail, sendCode } = useAuth();

  const handleSendEmail = async (email: string) => {
    const result = await sendEmail(email);

    if (result.success) {
      setCurrentEmail(email);
      setStep("verify-code");
    } else {
      throw new Error(result.error || "Failed to send email");
    }
  };

  const handleVerifyCode = async (code: string) => {
    const result = await sendCode(currentEmail, code);

    if (!result.success) {
      throw new Error(result.error || "Invalid code");
    }
  };

  const handleBack = () => {
    setStep("send-email");
    setCurrentEmail("");
  };

  return (
    <>
      {step === "send-email" && <SendEmailStep onSubmit={handleSendEmail} />}
      {step === "verify-code" && (
        <VerifyCodeStep email={currentEmail} onSubmit={handleVerifyCode} onBack={handleBack} />
      )}
    </>
  );
}

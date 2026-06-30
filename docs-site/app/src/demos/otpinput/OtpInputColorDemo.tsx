import { OtpInput } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      neutral:
      <OtpInput color="neutral" />
      primary:
      <OtpInput color="primary" />
      secondary:
      <OtpInput color="secondary" />
      accent:
      <OtpInput color="accent" />
      success:
      <OtpInput color="success" />
      error:
      <OtpInput color="error" />
      info:
      <OtpInput color="info" />
      warning:
      <OtpInput color="warning" />
    </div>
  );
}
Demo.displayName = "OtpInputColorDemo";

import { OtpInput } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      4位验证码:
      <OtpInput digits={4} />
      6位验证码(默认):
      <OtpInput />
      8位验证码:
      <OtpInput digits={8} />
    </div>
  );
}
Demo.displayName = "OtpInputBasicDemo";

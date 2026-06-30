import { OtpInput } from "@rtdui/core";

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      xs:
      <OtpInput size="xs" />
      sm:
      <OtpInput size="sm" />
      md(默认):
      <OtpInput />
      lg:
      <OtpInput size="lg" />
      xl:
      <OtpInput size="xl" />
    </div>
  );
}
Demo.displayName = "OtpInputSizeDemo";

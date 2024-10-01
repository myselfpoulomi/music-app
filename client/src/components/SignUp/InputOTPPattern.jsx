import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup >
        <InputOTPSlot index={0} className="w-[70px] h-[60px]" />
        <InputOTPSlot index={1} className="w-[70px] h-[60px]"/>
        <InputOTPSlot index={2} className="w-[70px] h-[60px]"/>
        <InputOTPSlot index={3} className="w-[70px] h-[60px]"/>
        <InputOTPSlot index={4} className="w-[70px] h-[60px]"/>
      </InputOTPGroup>
    </InputOTP>
  )
}

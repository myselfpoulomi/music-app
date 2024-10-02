import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";

export default function InputOTPPattern({ otp, setotp }) {
  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
      <InputOTP maxLength={5} value={otp} onChange={(value) => setotp(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} className="h-[60px] w-[60px] text-[18px]" />
          <InputOTPSlot index={1} className="h-[60px] w-[60px] text-[18px]" />
          <InputOTPSlot index={2} className="h-[60px] w-[60px] text-[18px]"/>
          <InputOTPSlot index={3} className="h-[60px] w-[60px] text-[18px]"/>
          <InputOTPSlot index={4} className="h-[60px] w-[60px] text-[18px]"/>
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

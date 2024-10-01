import { useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPPattern() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  // Handler to update the OTP value for a specific index
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    console.log(newOtp.join("")); // Combine OTP values into a single string
  };

  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        {otp.map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className="w-[70px] h-[60px]"
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { LOGO_URL } from "@/utils/constants";
import { useVerify } from "@/hooks/user-register";

const VerifyCard = ({ email }: { email: string }) => {
  const [otp, setOtp] = useState("");

  const { mutate: verifyOTP, isPending } = useVerify();

  const handleSubmit = () => {
    if (otp.length !== 4) {
      toast.error("Please Enter OTP");
      return;
    }
    verifyOTP({ email: email, otp: +otp });
  };
  return (
    <Card className="w-full h-full md:w-[487px] border-2 shadow-none">
      <CardHeader className="flex items-center justify-center">
        <Image src={LOGO_URL} height={56} width={56} alt="Logo" />
        <CardTitle className="text-2xl font-semibold ">HashCode</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5 items-center justify-center ">
          <h2 className="font-semibold">Verify Email Address</h2>
          <p className="text-muted-foreground">
            An OTP is send to the the {email}
          </p>
          <InputOTP
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={handleSubmit} disabled={isPending}>
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyCard;

"use client";

import { signIn } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-50 p-4">
      

      {/* Sign-in Card */}
      <Card className="w-full max-w-sm shadow-lg border border-slate-100">
        <CardContent className="p-6 space-y-6 ">
          <h1 className=" text-3xl font-bold text-slate-600">
          WELCOME TO CAHELP
        </h1>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium h-10 bg-black text-white"
            onClick={() => signIn("google")}
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M44.5 20H24v8.5h11.9C34.4 32.7 30.9 35 26 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.9 0 5.6 1.1 7.6 3L38 12.4C35 10 30.8 8 26 8 15.5 8 7.5 15.9 7.5 26.5S15.5 45 26 45c10.5 0 18-7.9 18-18v-1z"
        fill="#FFC107"
      />
      <path
        d="M6.3 14.7L12.6 18c2.2-4.2 6.4-7.1 11.4-7.1 2.9 0 5.6 1.1 7.6 3L38 12.4C35 10 30.8 8 26 8 18.5 8 11.7 11.9 6.3 14.7z"
        fill="#FF3D00"
      />
      <path
        d="M26 45c4.9 0 9.1-1.8 12.4-4.8L34.1 36C32 37.6 29.2 38.5 26 38.5c-4.9 0-9.1-1.8-12.4-4.8L6.3 33.3C10.6 38.1 17.8 45 26 45z"
        fill="#4CAF50"
      />
      <path
        d="M44.5 20H24v8.5h11.9C35 31 31 34 26 34c-4.9 0-9.1-1.8-12.4-4.8L6.3 33.3C10.6 38.1 17.8 45 26 45c10.5 0 18-7.9 18-18v-1z"
        fill="#1976D2"
        opacity="0.9"
      />
    </svg>
  );
}
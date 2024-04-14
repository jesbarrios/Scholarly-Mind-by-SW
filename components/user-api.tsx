"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import SignOutButton from "@/components/signout-btn";
import { useToast } from "./ui/use-toast";

export default function UserApi() {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (window) {
      const value = localStorage.getItem("apiKey") ?? "";
      setApiKey(value);
    }
  }, []);

  function handleSave() {
    localStorage.setItem("apiKey", apiKey);
    toast({
      title: "Saved profile",
    });
  }

  const handlePrivacyPolicyClick = () => {
    window.open("https://scholarlywings.org/scholarlymind/privacy-policy", "_blank");
  };

  const handleTermsOfServiceClick = () => {
    window.open("https://scholarlywings.org/scholarlymind/terms-and-conditions", "_blank");
  };

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <SignOutButton />
        <Button className="w-30" variant={"link"} onClick={handlePrivacyPolicyClick}>
          Privacy Policy
        </Button>
        <Button className="w-30" variant={"link"} onClick={handleTermsOfServiceClick}>
          Terms & Conditions
        </Button>
      </div>
    </>
  );
}

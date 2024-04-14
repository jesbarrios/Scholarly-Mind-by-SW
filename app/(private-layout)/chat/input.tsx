"use client";

import Submit from "@/components/submit";
import { Input } from "@/components/ui/input";
import { newChat } from "@/actions/chat";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";



export default function ChatInput() {
  const { theme } = useTheme();

  const router = useRouter();
  const { toast } = useToast();
  const [textInputHeight, setTextInputHeight] = useState(50);
  const [input, setInput] = useState<string>(""); 

  async function handleSubmit() {
    await setTextInputHeight(50);
    const message = input;
    if (!message) return;

    await setInput("");

    const apiKey = process.env.NEXT_PUBLIC_SECRETKEY!;
    const response = await newChat({ apiKey, message });

    if (response && "message" in response) {
      const { message: err } = response;
      if (err) {
        toast({
          title: err,
        });
      }
    } else {
      console.error("Unexpected response format:", response);
    }
  }



  async function handlePaste(event: { preventDefault: () => void; clipboardData: any; }) {
    await setTextInputHeight(100);
  }

  return (
    <>
      <form
        action={handleSubmit}
        className="flex flex-row items-center gap-2 sm:pr-5"
      >
        <textarea
          autoComplete="off"
          name="message"
          style={{
            width: "95%",
            maxHeight: "100px",
            height: textInputHeight + "px", 
            outline: "none",
            border: "none",
            backgroundColor: theme === "light" ? "#E5EBF2" : "#40414f",
            color: theme === "light" ? "black" : "white",
            paddingLeft: "8px",
            paddingTop: "10px",
            paddingBottom: "10px",
            resize: "none", 
            overflow: "auto", 
          }}
          placeholder="Send a message."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onPaste={handlePaste}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            } else if(e.key === "Enter" && e.shiftKey) {
              setTextInputHeight(100);
            }
          }}
        />
        <Submit />
      </form>
      <div className="flex justify-center pt-4">
        <span className="text-sm dark:text-[#a8a8aa] text-black">
          Scholarly Mind by Scholarly Wings. Free use. Guiding Students in
          Unlocking Their Full Potential.
        </span>
      </div>
      <div className="flex justify-center pt-1">
        <span className="text-sm dark:text-white text-black">
          Scholarly Mind can make mistakes. Make sure you use responsibly.
        </span>
      </div>
    </>
  );
}

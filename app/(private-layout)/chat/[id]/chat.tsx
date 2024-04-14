"use client";

import { chat } from "@/actions/chat";
import { getUser } from "@/lib/auth";
import Submit from "@/components/submit";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { generateRandomId } from "@/lib/utils";
import { JSONMessage } from "@/types";
import { useRouter } from "next/navigation";
import { ElementRef, useState, useEffect, useOptimistic, useRef } from "react";
import { scholarlymind } from "../../../assets/";
import { useSession } from "next-auth/react";

import { useTheme } from "next-themes";

import dotenv from "dotenv";
dotenv.config();


type ChatProps = {
  messages: JSONMessage[];
  id: string;
};

export default function Chat({ messages, id }: ChatProps) {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        answer: undefined,
        id: generateRandomId(4),
        question: newMessage,
      },
    ]
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [optimisticMessages]);

  const { data: session } = useSession();

  return (
    <div className="grow">
      <div className="flex flex-col items-start gap-12 pb-10 min-h-[75vh] sm:w-[95%]">
        {optimisticMessages.map((message) => (
          <div className="flex flex-col items-start gap-8 " key={message.id}>
            {/* User's message */}
            <div className="flex flex-row items-start gap-4 ">
              {session?.user.image ? (
                <img
                  src={session?.user.image}
                  alt="User Profile"
                  className="w-12 h-12 rounded-[10px] mr-2"
                  loading="lazy" 
                />
              ) : (
                <div className="w-12 h-12 rounded-[10px] mr-2 bg-gray-200"></div>
              )}
              <div>
                <h4 className="text-xl font-medium dark:text-sky-200 text-sky-800">
                  {session?.user.name}
                </h4>
                <p className="dark:text-slate-300 text-slate-900 whitespace-pre-wrap">
                  {message.question}
                </p>
              </div>
            </div>

            {/* AI's response */}
            <div className="flex flex-row items-start gap-4 ">
              <img
                src={scholarlymind.src}
                alt="Scholarly Mind"
                className="w-12 h-12 rounded-[10px] mr-2"
              />
              <div>
                <h4 className="text-xl font-medium dark:text-sky-200 text-sky-800">
                  {"Scholarly Mind"}
                </h4>
                <p className="dark:text-slate-300 text-slate-900 whitespace-pre-wrap">
                  {message.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={scrollRef}></div>
      <div className="mt-5 bottom-0 sticky pb-8 pt-1 bg-background">
        <ChatInput id={id} addMessage={addOptimisticMessage} />
      </div>
    </div>
  );
}

type ConversationComponent = {
  id: string;
  addMessage: (msg: string) => void;
};

function ChatInput({ addMessage, id }: ConversationComponent) {
  const [textInputHeight, setTextInputHeight] = useState(50); 
  const [input, setInput] = useState<string>(""); 
  const { theme } = useTheme();
  const inputRef = useRef<ElementRef<"input">>(null);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit() {
    await setTextInputHeight(50);
    
    const message = input;
    if (!message) return;

    await setInput("");

    const apiKey = process.env.NEXT_PUBLIC_SECRETKEY!;
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    addMessage(message);
    const err = await chat({
      apiKey,
      conversationId: id,
      message,
    });

    if (err?.message) {
      toast({
        title: err.message,
      });
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
            } else if (e.key === "Enter" && e.shiftKey) {
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

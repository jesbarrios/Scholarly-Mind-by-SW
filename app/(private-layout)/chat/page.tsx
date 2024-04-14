import ChatInput from "./input";
import { scholarlymind } from "@/app/assets";

export default function Chat() {
  return (
    <div className="grow">
      <div className="flex flex-col items-start gap-4 pb-10 min-h-[75vh] sm:w-[95%]">
        <div className="flex flex-row items-start gap-4 ">
          <img
            src={scholarlymind.src} // Assuming you have a variable for AI profile picture source
            alt="Scholarly Mind"
            className="w-[60px] h-[60px] rounded-[10px]"
          />
          <div>
            <h4 className="text-xl font-medium dark:text-sky-200 text-sky-800">
              {"Scholarly Mind"}
            </h4>
            <p className="dark:text-slate-300 text-slate-900 whitespace-pre-wrap">
              {
                "Hey there! I'm Scholarly Mind, your virtual tutor powered by Scholarly Wings, dedicated to guiding students to academic success. With expertise in multiple subjects, I provide thorough explanations and support whenever you're studying, even during those late-night sessions. My goal is to enhance your learning experience and boost your academic confidence. Remember, I may occasionally generate incorrect info, and my knowledge on the world and events is limited after 2021. How can I assist you today?"
              }
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 bottom-0 sticky pb-8 pt-1 bg-background">
        <ChatInput />
      </div>
    </div>
  );
}

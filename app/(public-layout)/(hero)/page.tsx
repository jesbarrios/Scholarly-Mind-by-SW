import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { logo } from "@/app/assets";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col items-center gap-5 justify-center h-[70vh]">
      <Image
        src={logo}
        alt="Scholarly Mind"
        className="hidden sm:block"
        height="175"
        width="175"
        style={{ marginTop: "10px" }}
      />
      <h3 className="text-4xl font-bold text-center">
        Welcome to Scholarly Mind, Powered by{" "}
        <a
          href="https://scholarlywings.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Scholarly Wings.
        </a>
      </h3>
      <p className="sm:w-[75%] mx-auto text-center dark:text-white text-black text-muted-foreground ">
        Helping students succeed academically by using artificial intelligence
        responsibly to provide personalized guidance and support on their
        educational path towards achievement and growth. Scholarly Mind is a
        virtual tutor using the power of artificial intelligence responsibly
        that helps students with coursework whenever they need it. Scholarly
        Mind is highly educated in several subjects, allowing for thorough
        explanations. Scholarly Mind makes big difference for students, with the
        goal of enhancing the learning experience and building academic
        confidence.
      </p>
      <Link href="/register" className={buttonVariants({ size: "lg" })}>
        Get Started
      </Link>
    </div>
  );
}

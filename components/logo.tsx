"use client"

import Link from "next/link";
import { darklogo, lightlogo } from "../app/assets";
import Image from "next/image";
import { useTheme } from "next-themes";

export function NamedLogoWithLink() {

  const { theme } = useTheme();


  return (
    <div>
      {theme === "light" ? (
        <Link href="/" className="flex flex-row items-center gap-3">
          <Image
            src={lightlogo}
            alt="Scholarly Mind Logo"
            height="175"
            width="175"
            style={{ marginTop: "10px" }}
          />{" "}
        </Link>
      ) : (
        <Link href="/" className="flex flex-row items-center gap-3">
          <Image
            src={darklogo}
            alt="Scholarly Mind Logo"
            height="175"
            width="175"
            style={{ marginTop: "10px" }}
          />{" "}
        </Link>
      )}
    </div>
  );
}

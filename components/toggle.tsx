"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme == "light" ? (
        <Button title="Toggle Theme" variant="ghost" size="icon" onClick={() => setTheme("dark")}>
          <MoonIcon className="w-[25px] h-[25px]" />
        </Button>
      ) : (
        <Button title="Toggle Theme" variant="ghost" size="icon" onClick={() => setTheme("light")}>
          <SunIcon className="w-[25px] h-[25px]" />
        </Button>
      )}
    </>
  );
}

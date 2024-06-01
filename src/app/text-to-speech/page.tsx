import {
  AudioLines,
  Info,
  Image as ImageIcon,
  SquareTerminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import Main from "@/components/tts/main";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Text To Speech",
  description: "By Elevenlabs",
};

export default function Dashboard() {
  return (
    <div className="grid h-screen w-full pl-[78px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b ml-2">
          <Image src="/actio.png" alt="logo" height={65} width={65} />
        </div>
        <nav className="grid gap-2 p-4">
        

        <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg bg-muted"
                aria-label="Text to Speech"
              >
                <AudioLines className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Text To Speech
            </TooltipContent>
          </Tooltip>


          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg "
                aria-label="Text to Image"
              >
                <ImageIcon className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Text To Image
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg"
                aria-label="Ollama"
              >
                <SquareTerminal className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Ollama
            </TooltipContent>
          </Tooltip>
          
        
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/about">
              <Button
                variant="ghost"
                size="sm"
                className="mt-auto rounded-lg"
                aria-label="About"
              >
                <Info className="size-5" />
              </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              About
            </TooltipContent>
          </Tooltip>
         
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Text To Speech</h1>
          <ModeToggle />
        </header>
        <main className="">
          <Main />
        </main>
      </div>
    </div>
  );
}

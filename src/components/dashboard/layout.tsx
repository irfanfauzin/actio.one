"use client";

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
import Image from "next/image";

import Link from "next/link";
import { ReactNode } from "react";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  children?: ReactNode;
}

export default function LayoutDashboard({ children }: Props) {
  const pathname = usePathname();
  return (
    <div className="grid h-screen w-full pl-[78px]">
      <aside className="inset-y fixed  -left-2 z-20 flex h-full flex-col border-r">
        <div className="border-b ml-2">
          <Image src="/actio.png" alt="logo" height={65} width={65} />
        </div>
        <nav className="grid gap-3 pl-4 pr-2 py-4 ">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/text-to-speech">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`mt-auto rounded-lg ${
                    pathname === "/text-to-speech" ? "bg-muted" : ""
                  }`}
                  aria-label="Text to Speech"
                >
                  <AudioLines className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Text To Speech
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/text-to-image">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-lg ${
                    pathname === "/text-to-image" ? "bg-muted" : ""
                  }`}
                  aria-label="Text to Image"
                >
                  <ImageIcon className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Text To Image
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/chatbot">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-lg ${
                    pathname === "/chatbot" ? "bg-muted" : ""
                  }`}
                  aria-label="Chatbot"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Chatbot AI Assistant
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto grid gap-2 pl-4 pr-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/about">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`mt-auto rounded-lg ${
                    pathname === "/about" ? "bg-muted" : ""
                  }`}
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
      <div className="flex flex-col -ml-4 md:ml-0">{children}</div>
    </div>
  );
}

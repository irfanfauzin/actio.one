
import MainTTS from "@/components/tts/main";
import { Metadata } from "next";
import LayoutDashboard from "@/components/dashboard/layout";

export const metadata: Metadata = {
  title: "Text To Speech",
  description: "By Elevenlabs",
};
import { ModeToggle } from "@/components/mode-toggle";


export default function TextToSpeech() {
  return (
    <LayoutDashboard>
       
      <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between gap-1 border-b -ml-3 bg-background px-6">
          <h1 className="text-xl font-semibold">Text To Speech</h1>
          <ModeToggle />
        </header>
      <MainTTS />
      <div className="mt-3 text-center text-sm p-4 ">
        AI Voice Generator by{" "}
        <a
          href="https://elevenlabs.io/"
          className="font-medium underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Elevenlabs.io
        </a>
      </div>
    </LayoutDashboard>
  );
}

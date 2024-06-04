
import MainChatbot from "@/components/chatbot/main";
import { Metadata } from "next";
import LayoutDashboard from "@/components/dashboard/layout";

export const metadata: Metadata = {
  title: "Chatbot",
  description: "By Monsterapi",
};
import { ModeToggle } from "@/components/mode-toggle";


export default function Chatbot() {
  return (
    <LayoutDashboard>
      <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between gap-1 border-b -ml-3 bg-background px-6">
          <h1 className="text-sm sm:text-xl font-semibold">Chatbot AI Assistant</h1>
          <ModeToggle />
        </header>
      <MainChatbot />
      <div className="mt-3 text-center text-sm p-4 ">
      Mistral-7B-Instruct-v0.2 Hosted by{" "}
        <a
          href="https://monsterapi.com/"
          className="font-medium underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Monsterapi
        </a>
      </div>
    </LayoutDashboard>
  );
}

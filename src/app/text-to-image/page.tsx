import MainTTI from "@/components/tti/main";
import { Metadata } from "next";
import LayoutDashboard from "@/components/dashboard/layout";

export const metadata: Metadata = {
  title: "Text To Image",
  description: "By Monsterapi",
};
import { ModeToggle } from "@/components/mode-toggle";

export default function TextToImage() {
  return (
    <LayoutDashboard>
      <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between gap-1 border-b -ml-3 bg-background px-6">
        <h1 className="text-xl font-semibold">Text To Image</h1>
        <ModeToggle />
      </header>
      <MainTTI />
      <div className="mt-3 text-center text-sm p-4 ">
        Stable Diffusion Hosted by{" "}
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

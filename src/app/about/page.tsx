
import MainAbout from "@/components/about/main"
import { Metadata } from "next";
import LayoutDashboard from "@/components/dashboard/layout";

export const metadata: Metadata = {
  title: "About",
  description: "Actio One",
};
import { ModeToggle } from "@/components/mode-toggle";


export default function About() {
  return (
    <LayoutDashboard>
      <header className="sticky top-0 z-10 flex h-[66px] items-center justify-between gap-1 border-b -ml-3 bg-background px-6">
          <h1 className="text-sm sm:text-xl font-semibold">About</h1>
          <ModeToggle />
        </header>
      <MainAbout />
      
    </LayoutDashboard>
  );
}

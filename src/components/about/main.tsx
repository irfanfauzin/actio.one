import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";

export default function MainAbout() {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right flex flex-col items-center">
            <Image
              src="/actio.png"
              height={200}
              width={200}
              alt="Actio 1"
            ></Image>
            <h2 className="text-3xl font-bold sm:text-4xl">Actio One</h2>

            <p className="mt-4 p-4">
              This is{" "}
              <Link
                className="underline"
                href="https://fauzi.dev/"
                target="_blank"
              >
                my
              </Link>{" "}
              personal project. All rights reserved. Thanks to everyone who
              provided their services for free. If you notice anything amiss,
              hit me up!
            </p>

            <a href="mailto:irfan@fauzi.dev">
              <Button className="my-10 w-full" variant={"outline"}>
                Contact Me
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              className="block rounded-xl border border-muted p-8 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              href="https://ui.shadcn.com/"
              target="_blank"
            >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <Icons.shadcn />
              </span>

              <h2 className="mt-2 font-bold">Shadcn/UI</h2>

              <p className=" sm:mt-1 sm:block sm:text-sm ">
                Beautifully designed components that you can copy and paste into
                your apps.
              </p>
            </a>

            <a
              className="block rounded-xl border border-muted p-8 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              href="https://vercel.com/"
              target="_blank"
            >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <Icons.vercel />
              </span>

              <h2 className="mt-2 font-bold">Vercel</h2>

              <p className=" sm:mt-1 sm:block sm:text-sm ">
                Vercel is the Frontend Cloud. Build, scale, and secure a faster,
                personalized web.
              </p>
            </a>

            <a
              className="block rounded-xl border border-muted p-8 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              href="https://monsterapi.ai/"
              target="_blank"
            >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <Image
                  src="/monster.png"
                  height={50}
                  width={25}
                  alt="MonsterAPI"
                />
              </span>

              <h2 className="mt-2 font-bold">MonsterAPI</h2>

              <p className=" sm:mt-1 sm:block sm:text-sm ">
                Monstergpt world&apos;s first fine-tuning and deployment agent.
              </p>
            </a>

            <a
              className="block rounded-xl border border-muted p-8 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
              href="https://elevenlabs.io/"
              target="_blank"
            >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <Icons.elevenlabs />
              </span>

              <h2 className="mt-2 font-bold">ElevenLabs</h2>

              <p className=" sm:mt-1 sm:block sm:text-sm ">
                ElevenLabs is a software company that specializes in developing
                natural-sounding speech synthesis software using deep learning.
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

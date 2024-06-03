//@ts-nocheck

"use client";
import { Bird, Rabbit, Turtle } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/components/loader.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "next/image";
import MonsterApiClient from "monsterapi"
import { useToast } from "@/components/ui/use-toast";

export default function MainTTI() {
  const { toast } = useToast();

  // TODO Create an API to prevent exposing key
  const client = new MonsterApiClient(process.env.NEXT_PUBLIC_MONSTER_API_KEY);

  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [negPrompt, setNegPrompt] = useState("");
  const [style, setStyle] = useState();
  const [aspectRatio, setAspectRatio] = useState("landscape");
  const [seed, setSeed] = useState(-1);
  const [steps, setSteps] = useState(10);
  const [guidanceScale, setGuidanceScale] = useState(5);

  const [isLoad, setIsLoad] = useState(false);

  const generate = async () => {
    if (!prompt) {
      toast({
        variant: "destructive",
        description: "Please type your prompt first!",
      });
      return;
    }

    if (prompt.length < 3) {
      toast({
        variant: "destructive",
        description: "Input prompt minimal 3 character.",
      });
      return;
    }

    setImageUrl("");
    setIsLoad(true);

    let process_id;

    const model = "sdxl-base"; // Replace with a valid model name
    const input = {
      prompt: prompt,
      aspect_ratio: aspectRatio,
      negprompt: negPrompt,
      samples: 1,
      steps: Number(steps),
      guidance_scale: Number(guidanceScale),
      seed: Number(seed),
      enhance: true,
      optimize: true,
      safe_filter: false,
    };

    if (style || style !== "noStyle") {
      input.style = style;
    }

    await client
      .get_response(model, input)
      .then((result) => {
        // Handle the status response from the API
        process_id = result.process_id;

        client
          .wait_and_get_result(process_id)
          .then((result) => {
            setImageUrl(result.output[0]);
            setIsLoad(false);
          })
          .catch((error) => {
            // Handle API errors or timeout
            const errorMessage = error.message.split(": ")[1];
            console.log(errorMessage);

            toast({
              variant: "destructive",
              title: "Uh oh! Something wrong.",
              description: errorMessage,
            });

            setIsLoad(false);
          });
      })
      .catch((error) => {
        // Handle API errors
        const errorMessage = error.message.split(": ")[1];

        console.log(errorMessage);
        toast({
          variant: "destructive",
          title: "Uh oh! Something wrong.",
          description: errorMessage,
        });

        setIsLoad(false);
      });
  };

  return (
    <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        className="relative flex-col items-start gap-8 "
        x-chunk="dashboard-03-chunk-0"
      >
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <div className="grid gap-3">
              <Label htmlFor="model">Model</Label>
              <Select disabled>
                <SelectTrigger
                  id="model"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="SDXL" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genesis">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Rabbit className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{" "}
                          <span className="font-medium text-foreground">
                            Genesis
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Our fastest model for general use cases.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="explorer">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Bird className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{" "}
                          <span className="font-medium text-foreground">
                            Explorer
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Performance and speed for efficiency.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="quantum">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Turtle className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{" "}
                          <span className="font-medium text-foreground">
                            Quantum
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          The most powerful model for complex computations.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">Guidance Scale</Label>
              <Input
                type="number"
                placeholder="5"
                min={5}
                max={50}
                onChange={(event) => {
                  setGuidanceScale(event.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">Steps</Label>
                <Input
                  type="number"
                  min={10}
                  max={500}
                  placeholder="10"
                  onChange={(event) => {
                    setSteps(event.target.value);
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Seed</Label>
                <Input
                  id="seed"
                  type="number"
                  placeholder="-1"
                  onChange={(event) => {
                    setSeed(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="role">Style</Label>
              <Select
                defaultValue="noStyle"
                onValueChange={(value) => {
                  setStyle(value); // Set the text value
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noStyle">no style</SelectItem>
                  <SelectItem value="enhance">enhance</SelectItem>
                  <SelectItem value="anime">anime</SelectItem>
                  <SelectItem value="photographic">photographic</SelectItem>
                  <SelectItem value="digital-art">digital-art</SelectItem>
                  <SelectItem value="comic-book">comic-book</SelectItem>
                  <SelectItem value="fantasy-art">fantasy-art</SelectItem>
                  <SelectItem value="analog-film">analog-film</SelectItem>
                  <SelectItem value="neonpunk">neonpunk</SelectItem>
                  <SelectItem value="isometric">isometric</SelectItem>
                  <SelectItem value="lowpoly">lowpoly</SelectItem>
                  <SelectItem value="origami">origami</SelectItem>
                  <SelectItem value="line-art">line-art</SelectItem>
                  <SelectItem value="craft-clay">craft-clay</SelectItem>
                  <SelectItem value="cinematic">cinematic</SelectItem>
                  <SelectItem value="3d-model">3d-model</SelectItem>
                  <SelectItem value="pixel-art">pixel-art</SelectItem>
                  <SelectItem value="texture">texture</SelectItem>
                  <SelectItem value="futuristic">futuristic</SelectItem>
                  <SelectItem value="realism">realism</SelectItem>
                  <SelectItem value="watercolor">watercolor</SelectItem>
                  <SelectItem value="photorealistic">photorealistic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="role">Aspect Ratio</Label>
              <Select
                defaultValue="landscape"
                onValueChange={(value) => {
                  setAspectRatio(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Negative Prompt</Label>
              <Textarea
                id="content"
                placeholder="No dog"
                className="min-h[2rem] md:min-h-[9.5rem] md:max-h-[9.5rem]"
                onChange={(event) => {
                  setNegPrompt(event.target.value); // Set the text value
                }}
              />
            </div>
          </fieldset>
        </form>
      </div>
      <div className="relative flex max-h-[640px] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <div className="flex-1 min-h-[100px]">
          {isLoad && (
            <div className="loading w-full h-full object-contain ">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          {/* Image will be rendered here */}
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              alt="Generated Image"
              className="w-full max-h-[500px] object-contain rounded-xl pb-6"
            />
          )}
        </div>

        <form
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
          x-chunk="dashboard-03-chunk-1"
        >
          
          <Textarea
            onChange={(event) => {
              setPrompt(event.target.value); // Set the text value
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                if (!e.shiftKey) {
                  e.preventDefault();
                  if (isLoad) {
                    toast({
                      variant: "destructive",
                      description: "Please wait, the bot is still thinking",
                    });
                    return;
                  }
                  generate();

                }
              }
            }}
            id="message"
            placeholder="Type your prompt here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            {isLoad ? (
              <Button className="ml-auto gap-1.5" size="sm" disabled>
                Generating
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  generate();
                }}
               

                size="sm"
                className="ml-auto gap-1.5"
              >
                Generate
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { Models } from "./models";
import { Player } from "./player";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Card } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

import { Switch } from "@/components/ui/switch";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function Main() {
  const { toast } = useToast();

  const [source, setSource] = useState<string>("");
  const [idModel, setIdModel] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [text, setText] = useState("");
  const [clarity, setClarity] = useState<number[]>([0.25]);
  const [boost, setBoost] = useState<boolean>(false);
  const [stability, setStability] = useState<number[]>([0.75]);

  const handleLabelClick = (preview_url: string, idModel: string) => {
    setSource(preview_url);
    setIdModel(idModel);
  };

  const convert = async () => {
    if (!idModel) {
      toast({
        variant: "destructive",
        title: "Uh oh! Select voice model first.",
        description: "There was a problem with your request.",
      });
      return;
    }

    if (!text) {
      toast({
        variant: "destructive",
        title: "Uh oh! Input text first.",
        description: "There was a problem with your request.",
      });
      return;
    }

    setIsLoading(true);
    setSource("");

    try {
      const headers = {
        Accept: "audio/mpeg",
        "xi-api-key": process.env.REACT_APP_XI_API_KEY,
        "Content-Type": "application/json",
      };

      const body = JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          similarity_boost: Number(clarity),
          stability: Number(stability),
          use_speaker_boost: boost,
        },
      });

      const speechDetails = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${idModel}`,
        body,
        {
          headers: headers,
          responseType: "arraybuffer", // This is important for handling binary data
        }
      );

      // Create a new Blob object from the audio data with MIME type 'audio/mpeg'
      const blob = new Blob([speechDetails.data], { type: "audio/mpeg" });
      // Create a URL for the blob object
      const url = URL.createObjectURL(blob);

      setSource(url);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Card className="md:p-4 md:m-4 border-none md:border-solid">
        <div
          className="relative flex-col items-start gap-8 md:flex"
          x-chunk="dashboard-03-chunk-0"
        >
          <form className="grid w-full items-start gap-6">
            <div className="grid gap-0 md:grid-cols-2 w-full">
              <fieldset className=" pt-6 px-6">
                <div className="grid gap-3">
                  <Models onLabelClick={handleLabelClick} />
                </div>
                <div className="grid gap-3">
                  <div className="grid gap-2 pt-2">
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="Clarity">Clarity</Label>
                            <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                              {clarity[0] * 100}%
                            </span>
                          </div>
                          <Slider
                            id="Clarity"
                            max={1}
                            defaultValue={clarity}
                            step={0.01}
                            onValueChange={setClarity}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                            aria-label="Clarity"
                          />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        align="start"
                        className="w-[260px] text-sm"
                        side="left"
                      >
                        High enhancement boosts overall voice clarity and target
                        speaker similarity. Very high values can cause
                        artifacts, so adjusting this setting to find the optimal
                        value is encouraged.{" "}
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <div className="grid gap-3">
                  <div className="grid gap-2 pt-2">
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="stability">Stability</Label>
                            <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                              {stability[0] * 100}%
                            </span>
                          </div>
                          <Slider
                            id="stability"
                            max={1}
                            defaultValue={stability}
                            step={0.01}
                            onValueChange={setStability}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                            aria-label="stability"
                          />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent
                        align="start"
                        className="w-[260px] text-sm"
                        side="left"
                      >
                        Increasing stability will make the voice more consistent
                        between re-generations, but it can also make it sounds a
                        bit monotone. On longer text fragments we recommend
                        lowering this value.
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <Separator className="my-4 hidden md:block" />
                <div className="grid gap-3">
                  <div>
                    <div className="flex items-center justify-between space-x-2 mt-10 md:mt-0">
                      <Label
                        htmlFor="necessary"
                        className="flex flex-col space-y-1 "
                      >
                        <span>Speaker Boost</span>
                        <span className="text-sm text-stone-400">
                          Boost the similarity of the synthesized speech and the
                          voice at the cost of some generation speed.
                        </span>
                      </Label>
                      <Switch
                        id="necessary"
                        onChange={() => {
                          setBoost((prev) => !prev);
                          console.log(boost);
                        }}
                      />
                    </div>
                  </div>
              
                </div>
              </fieldset>
              <div className=" pt-0 md:pt-6 px-6">
                <div className="md:order-2 col-span-2">
                  <div className="flex h-full flex-col justify-between mt-10 lg:mt-0">
                    <Textarea
                      className="min-h-[100px] max-h-[200px]"
                      maxLength={100}
                      placeholder="Enter your text"
                      onChange={(event) => {
                        setText(event.target.value); // Set the text value
                      }}
                    />

                    <div className=" justify-between p-4 hidden md:flex">
                      <p className="text-default-500 text-small">
                        {text.length} / 100{" "}
                      </p>
                      <p className="text-default-500 text-small">
                        Quota remaining: 3000{" "}
                      </p>
                    </div>
                    {isLoading ? (
                      <Button className="w-full rounded-md mt-4" disabled>
                        <ReloadIcon className="animate-spin" />
                        Please wait
                      </Button>
                    ) : (
                      <Button
                        className="w-full rounded-md  mt-4"
                        onClick={(e) => {
                          e.preventDefault();
                          convert();
                        }}
                      >
                        Convert
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Player source={source} />
      </Card>
    </>
  );
}

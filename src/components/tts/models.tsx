"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useSWR from "swr";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => res.json());

interface ModelProps {
  onLabelClick: (source: string, idModel: string) => void;
}

export function Models({ onLabelClick }: ModelProps) {
  const [nameModel, setNameModel] = useState<string>("");
  const [idModel, setIdModel] = useState<string>("");

  const handleLabelClick = (id: string, source: string, name: string) => {
    // Call the parent function to update the source URL
    setIdModel(id);
    setNameModel(name);
    onLabelClick(source, id);
    simulateEscKeyPress();
  };

  function simulateEscKeyPress() {
    // Create a new "keydown" event with the "Esc" key
    var event = new KeyboardEvent("keydown", {
      key: "Escape",
      keyCode: 27,
    });

    // Dispatch the event to simulate pressing the "Esc" key
    document.dispatchEvent(event);
  }

  const { data, error, isLoading } = useSWR(
    "https://api.elevenlabs.io/v1/voices",
    fetcher
  );

  if (isLoading)
    return (
      <>
        <Skeleton className="h-10 w-full" />
      </>
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-2">
          {nameModel ? nameModel + "'s Voice" : "Select Voice Model"}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[calc(100%-100px)] md:max-h-[calc(100%-100px)] sm:max-w-md sm:max-h-[200px]">
        <DialogHeader>
          <DialogTitle>Select a voice model</DialogTitle>
          <DialogDescription>
            {data.voices.length} Models available or create your own model.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="lg:w-full h-[400px]">
          <RadioGroup defaultValue={idModel}>
            <div className="grid gap-4 py-4 grid-cols-2 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-3">
              {/* Repeat this block for each RadioGroupItem */}

              {data.voices.map((item: any, index: number) => (
                <div key={index}>
                  <div>
                    <RadioGroupItem
                      defaultValue={idModel}
                      value={item.voice_id}
                      id={item.voice_id}
                      className="peer"
                    />
                    <Label
                      onClick={() => {
                        handleLabelClick(
                          item.voice_id,
                          item.preview_url,
                          item.name
                        );
                      }}
                      htmlFor={item.voice_id}
                      className={`relative flex flex-col items-left justify-between p-4 rounded-md border-2 border-muted hover:bg-accent hover:text-accent-foreground ${
                        item.labels.gender === "male"
                          ? "text-red-700 peer-data-[state=checked]:border-red-700 "
                          : "text-blue-700 peer-data-[state=checked]:border-blue-700"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`mt-2 text-xs ${
                          item.labels.gender === "male"
                            ? "text-red-400 "
                            : "text-blue-400"
                        }`}
                      >
                        {item.labels.accent} {item.labels.description}{" "}
                        {item.labels.age} {item.labels.gender}
                      </span>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

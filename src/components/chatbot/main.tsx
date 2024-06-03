//@ts-nocheck
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import MonsterApiClient from "monsterapi";
import "@/components/loader.css";
import Image from "next/image";

export default function MainChatbot() {
  const [history, setHistory] = useState([]);
  const { toast } = useToast();
  // TODO Create an API to prevent exposing key
  const client = new MonsterApiClient(process.env.NEXT_PUBLIC_MONSTER_API_KEY);

  const [botTyping, setBotTyping] = useState(false);

  const [prompt, setPrompt] = useState("");

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollRef = useRef(null);

  const sendMessage = async (message) => {
    if (!prompt) {
      toast({
        variant: "destructive",
        description: "Please type your message!",
      });
      return;
    }

    setHistory((prevHistory) => [
      ...prevHistory,
      { from: "user", text: message },
    ]);

    setBotTyping(true);
    const requestData = {
      messages: [{ role: "user", content: prompt }],
      model: "mistralai/Mistral-7B-Instruct-v0.2",
    };

    setPrompt("");

    await client
      .generateSync(requestData)
      .then((response) => {
        setHistory((prevHistory) => [
          ...prevHistory,
          { from: "bot", text: response.text[0] },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setBotTyping(false);
  };

  return (
    <div className="flex justify-center mt-2 md:mt-6	">
      <Card className="w-full md:w-9/12 lg:w-7/12  md:p-4 md:m-4 border-none md:border-solid shadow-none md:shadow-lg ">
        <div className="flex-1  justify-between flex flex-col h-[400px]">
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            <ScrollArea>
              {history.map((message, key) => (
                <div key={key}>
                  <div
                    className={`flex items-end mt-6 ${
                      message.from === "bot" ? "" : "justify-end"
                    }`}
                  >
                    <div
                      className={`flex-col space-y-2 text-sm inline-block leading-tight max-w-lg  mr-4 ${
                        message.from === "bot"
                          ? "order-2 items-start"
                          : "order-1 items-end"
                      }`}
                    >
                      <div>
                        <span
                          className="bg-muted px-4 py-3 rounded-xl inline-block"
                          ref={scrollRef}
                        >
                          <pre
                            className="inline-block"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {message.text.replace(/```/g, "\n\n")}
                          </pre>
                        </span>
                      </div>
                    </div>
                    {message.from === "bot" && (
                      <Image
                        src="/actio.png"
                        alt="Actio One"
                        width={40}
                        height={40}
                        className={`w-10 h-10 rounded-full ${
                          message.from === "bot" ? "order-1" : "order-2"
                        }`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>

        <form
          className="relative  bg-muted overflow-hidden rounded-lg border mx-6 md:mx-0 focus-within:ring-1 focus-within:ring-ring"
          x-chunk="dashboard-03-chunk-1"
        >
          <Textarea
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                if (!e.shiftKey) {
                  e.preventDefault();
                  if (botTyping) {
                    toast({
                      variant: "destructive",
                      description: "Please wait, the bot is still thinking",
                    });
                    return;
                  }
                  setPrompt(e.target.value);

                  sendMessage(prompt);
                }
              }
            }}
            placeholder="Type your message here..."
            className=" min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center p-3 pt-0">
            {botTyping ? (
              <Button className="ml-auto gap-1.5" size="sm" disabled>
                Please wait
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  sendMessage(prompt);
                }}
                size="sm"
                className="ml-auto gap-1.5"
              >
                Send message
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

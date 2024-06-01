"use client";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import React, { createRef, RefObject } from "react";
import { DownloadIcon } from "lucide-react";

const player: RefObject<AudioPlayer> = createRef();

interface PlayerProps {
  source: string;
}

export function Player({ source }: PlayerProps) {
  const download = async (test: any) => {
    // Create an anchor element
    const downloadLink = document.createElement("a");

    // Set the href and download attributes
    downloadLink.href = test;
    downloadLink.download = "audio.mp3"; // Set the filename for the download

    // Trigger a click event to initiate the download
    downloadLink.click();
  };

  return (
    <>
      <div className="mt-6 ">
        {source ? (
          <AudioPlayer
            autoPlay
            key="player"
            ref={player}
            layout="horizontal"
            customProgressBarSection={[
              <div
                key="player"
                className="w-10 cursor-pointer dark:text-white text-black"
                onClick={() => {
                  download(source);
                }}
              >
                <DownloadIcon className="dark:bg-white dark:text-black bg-black text-white rounded-full p-2" size={35}/>
              </div>,
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_TIME,
              
            ]}
            customControlsSection={
              [
                  // RHAP_UI.ADDITIONAL_CONTROLS,
              ]
            }
            className=" rounded-lg 	"
            src={source}
            showDownloadProgress

            // other props here
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

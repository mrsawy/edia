"use client"

import { useState, useRef } from "react";
import SpinWheelComponent from "@/components/SpinWheel";
import "./globals.css";
import { PrizeEnum } from "@/lib/types/PrizeType.enum";
import { usePrizes } from "@/lib/hooks/usePrizes";
import RandomQuestionDialog from "@/components/PickQuestionDialog";
import { playSoundLoop } from "@/lib/utils";

export default function Home() {
  const { data, isSuccess } = usePrizes();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartSound = () => {
    if (!audioRef.current) {
      audioRef.current = playSoundLoop("/mp3/b1.mp3");
      setIsPlaying(true);
    }
  };

  const handleStopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col w-full fullscreen-bg" 
    // style={{
    //   backgroundImage: `url(${bg1.src})`,
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    //   // backgroundPosition: "top"
    // }}
    >
      <div className="flex  flex-row-reverse">
        <button
          onClick={handleStartSound}
          disabled={isPlaying}
          className="p-2 m-2 bg-green-500 text-white rounded cursor-pointer"
        >
          تشغيل الموسيقى
        </button>
        <button
          onClick={handleStopSound}
          disabled={!isPlaying}
          className="p-2 m-2 bg-red-500 text-white rounded cursor-pointer"
        >
          إيقاف الموسيقى
        </button>
      </div>

      <RandomQuestionDialog />
      <div
        className="flex flex-row flex-wrap sm:flex-nowrap items-around w-full h-full"
        style={{ direction: "rtl" }}
      >
        {isSuccess && data && (
          <>
            <SpinWheelComponent
              items={data.data
                .filter((p) => p.prizeType == PrizeEnum.correct)
                .map((p) => ({ ...p, label: p.content }))}
              className="mx-auto"
              buttonText="لف عجلة الإجابات الصحيحة"
            />
            <SpinWheelComponent
              items={data.data
                .filter((p) => p.prizeType == PrizeEnum.wrong)
                .map((p) => ({ ...p, label: p.content }))}
              className="mx-auto"
              buttonText="لف عجلة الإجابات الخاطئة"
            />
          </>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

export type AmbientSound = "none" | "rain" | "ocean" | "forest";

const soundUrls: Record<Exclude<AmbientSound, "none">, string> = {
  rain: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_4deebf67c1.mp3?filename=rain-and-thunder-loop-15008.mp3",
  ocean: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_b879ecf2e9.mp3?filename=ocean-wave-crashing-loop-2962.mp3",
  forest: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=birds-19624.mp3",
};

export function useAmbientSound() {
  const [currentSound, setCurrentSound] = useState<AmbientSound>("none");
  const [volume, setVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentSound === "none") {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(soundUrls[currentSound]);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentSound, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = () => {
    if (audioRef.current && currentSound !== "none") {
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return {
    currentSound,
    setCurrentSound,
    volume,
    setVolume,
    isPlaying,
    play,
    pause,
    stop,
  };
}

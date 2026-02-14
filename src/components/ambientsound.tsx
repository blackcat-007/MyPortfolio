import { useEffect, useRef, useState } from "react";

let audioInstance: HTMLAudioElement | null = null;

export const useAmbientSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    if (!audioInstance) return;

    if (audioInstance.paused) {
      audioInstance.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audioInstance.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!audioInstance) return;

    const updateState = () => {
      setIsPlaying(!audioInstance!.paused);
    };

    // Sync on play/pause events
    audioInstance.addEventListener("play", updateState);
    audioInstance.addEventListener("pause", updateState);

    // Initial sync (for autoplay case)
    updateState();

    return () => {
      audioInstance?.removeEventListener("play", updateState);
      audioInstance?.removeEventListener("pause", updateState);
    };
  }, []);

  return { isPlaying, toggleSound };
};

const AmbientSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.25;

    audioInstance = audio;
    audioRef.current = audio;

    // autoplay after interaction
    const startAudio = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", startAudio);
    };

    window.addEventListener("click", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
      audio.pause();
    };
  }, []);

  return null;
};

export default AmbientSound;

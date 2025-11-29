import { useEffect, useRef, useState } from "react";
import { TimeOfDay } from "./useDayNightCycle";

interface AmbientSound {
  url: string;
  volume: number;
}

const soundMap: Record<TimeOfDay, AmbientSound | null> = {
  dawn: {
    url: "https://assets.mixkit.co/active_storage/sfx/2390/2390-preview.mp3", // Birds chirping
    volume: 0.3,
  },
  day: {
    url: "https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3", // Light breeze
    volume: 0.2,
  },
  dusk: {
    url: "https://assets.mixkit.co/active_storage/sfx/2390/2390-preview.mp3", // Evening birds
    volume: 0.25,
  },
  night: {
    url: "https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3", // Night ambience
    volume: 0.15,
  },
};

export function useAmbientSound(timeOfDay: TimeOfDay, enabled: boolean = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted to avoid autoplay issues
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true);
      // Auto-unmute on first interaction
      if (isMuted) {
        setIsMuted(false);
      }
    };

    // Listen for any user interaction
    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (!enabled || isMuted || !hasInteracted) return;

    const sound = soundMap[timeOfDay];
    if (!sound) return;

    // Create or update audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;
    
    // If already playing the same sound, don't restart
    if (audio.src.includes(sound.url) && !audio.paused) {
      return;
    }

    // Fade out current sound
    const fadeOut = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - 0.05);
      } else {
        clearInterval(fadeOut);
        audio.pause();
        
        // Switch to new sound
        audio.src = sound.url;
        audio.volume = 0;
        audio.play().then(() => {
          // Fade in new sound
          const fadeIn = setInterval(() => {
            if (audio.volume < sound.volume - 0.05) {
              audio.volume = Math.min(sound.volume, audio.volume + 0.05);
            } else {
              audio.volume = sound.volume;
              clearInterval(fadeIn);
            }
          }, 100);
        }).catch(() => {
          // Autoplay blocked, user needs to interact
          console.log("Audio autoplay blocked");
        });
      }
    }, 100);

    return () => {
      clearInterval(fadeOut);
    };
  }, [timeOfDay, enabled, isMuted, hasInteracted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (audioRef.current) {
      if (newMutedState) {
        // Muting - pause audio
        audioRef.current.pause();
      } else {
        // Unmuting - play audio
        setHasInteracted(true); // Ensure we mark as interacted
        const sound = soundMap[timeOfDay];
        if (sound) {
          audioRef.current.src = sound.url;
          audioRef.current.volume = sound.volume;
          audioRef.current.play().catch(() => {
            console.log("Audio play failed");
          });
        }
      }
    }
  };

  return { isMuted, toggleMute, hasInteracted };
}

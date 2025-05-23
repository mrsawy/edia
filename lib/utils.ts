import confetti from "canvas-confetti";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shuffleArray(array: any[]) {
  const arr = [...array]; // make a copy to avoid mutating original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}


export const celebrate = () => {
  (() => {

    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star']
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle']
      });
    }

    const shootInterval = setInterval(() => { shoot() }, 200)
    setTimeout(() => { clearInterval(shootInterval) }, 9000)
  })()


  const duration = 9 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);






  const end = Date.now() + (9 * 1000);

  // go Buckeyes!
  const colors = ['#bb0000', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());




  // (function frame() {
  //   const duration = 10 * 1000;
  //   const animationEnd = Date.now() + duration;
  //   let skew = 1;
  //   const timeLeft = animationEnd - Date.now();
  //   const ticks = Math.max(200, 500 * (timeLeft / duration));
  //   skew = Math.max(0.8, skew - 0.001);

  //   confetti({
  //     particleCount: 1,
  //     startVelocity: 0,
  //     ticks: ticks,
  //     origin: {
  //       x: Math.random(),
  //       // since particles fall down, skew start toward the top
  //       y: (Math.random() * skew) - 0.2
  //     },
  //     colors: ['#ffffff'],
  //     shapes: ['circle'],
  //     gravity: randomInRange(0.4, 0.6),
  //     scalar: randomInRange(0.4, 1),
  //     drift: randomInRange(-0.4, 0.4)
  //   });

  //   if (timeLeft > 0) {
  //     requestAnimationFrame(frame);
  //   }
  // }());

}



export const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.play();
};

export const playSoundLoop = (src: string) => {
  const audio = new Audio(src);
  audio.loop = true;   // This makes it repeat indefinitely
  audio.volume = 0.5;
  audio.play().catch(err => {
    console.error("Failed to play audio:", err);
  });
  return audio; // Return the audio element so you can pause/stop it later if needed
};
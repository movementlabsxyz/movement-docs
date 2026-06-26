'use client';

import Lottie from 'lottie-react';
import animationData from './motionWalletAnimation.json';

export function MotionLogo({ size = 160 }: { size?: number }) {
  return (
    <a
      href="https://motion.movementnetwork.xyz/"
      target="_blank"
      rel="noreferrer"
      className="not-prose my-6 flex w-fit flex-col items-center gap-3 no-underline"
    >
      <span
        className="flex items-center justify-center rounded-2xl bg-[#0A0A0A] p-4 ring-1 ring-white/10"
        style={{ width: size, height: size }}
      >
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </span>
      <span className="text-sm font-medium">Get Motion Wallet</span>
    </a>
  );
}

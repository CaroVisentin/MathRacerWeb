// InfoBox.tsx
import React from "react";

interface InfoBoxProps {
  children: React.ReactNode;
}

export const InfoBox = ({ children }: InfoBoxProps) => (
  <div className="w-48 h-10 text-2xl bg-white/70 rounded-xl shadow flex items-center justify-center text-black font-bold">
    {children}
  </div>
);

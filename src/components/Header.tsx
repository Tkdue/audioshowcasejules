import React from "react";

export default function Header() {
  return (
    <header className="w-full max-w-container mx-auto px-6 py-10 flex flex-col items-center text-center">
      <h1 className="text-h1 font-bold tracking-tight bg-gradient-to-b from-primary-yellow to-primary-yellowAccent bg-clip-text text-transparent drop-shadow-lg mb-2 animate-slideInText">
        AUDIO SHOWCASE <span className="font-normal text-h3">powered by A31Films</span>
      </h1>
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-h3 font-medium text-primary-deepBlue tracking-tight">CLIENT : TBWA</span>
        <span className="text-h3 font-medium text-primary-indigo tracking-tight">PROJECT : GOOGLE AI VIDEOPODCAST VO</span>
      </div>
    </header>
  );
}

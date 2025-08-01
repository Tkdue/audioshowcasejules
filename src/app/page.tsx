
'use client';


import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import AudioCard from "@/components/AudioCard";

interface AudioBox {
  id: string;
  title: string;
  audioUrl: string;
}

const PASSWORD = "Tk2";

function askPassword(action: string): boolean {
  const input = typeof window !== 'undefined' ? window.prompt(`Per ${action} inserisci la password:`) : null;
  return input === PASSWORD;
}

export default function Home() {
  const [boxes, setBoxes] = useState<AudioBox[]>([]);

  // Carica da localStorage all'avvio
  useEffect(() => {
    const saved = localStorage.getItem("audio_boxes");
    if (saved) {
      setBoxes(JSON.parse(saved));
    } else {
      setBoxes([{ id: "demo", title: "Demo Audio", audioUrl: "/sample.mp3" }]);
    }
  }, []);

  // Salva su localStorage ogni volta che boxes cambia
  useEffect(() => {
    localStorage.setItem("audio_boxes", JSON.stringify(boxes));
  }, [boxes]);

  const handleDelete = (id: string) => {
    if (askPassword("eliminare questo box")) {
      setBoxes(boxes => boxes.filter(b => b.id !== id));
    }
  };

  // Ora handleReplace accetta una stringa URL (cloud)
  const handleReplace = (id: string, url: string) => {
    setBoxes(boxes => boxes.map(b => b.id === id ? { ...b, audioUrl: url } : b));
  };

  const handleTitleChange = (id: string, newTitle: string) => {
    setBoxes(boxes => boxes.map(b => b.id === id ? { ...b, title: newTitle } : b));
  };

  const handleAdd = () => {
    if (askPassword("creare un nuovo box")) {
      setBoxes(boxes => [
        ...boxes,
        {
          id: Math.random().toString(36).slice(2),
          title: "Nuovo Audio",
          audioUrl: "",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-obsidian to-[#23243a] text-porcelain font-sans">
      <Header />
      <main className="w-full max-w-container mx-auto px-6 py-8">
        <div className="flex justify-end mb-6">
          <button
            className="btn-accent bg-primary-yellow text-obsidian font-bold px-5 py-2 rounded-card shadow-card hover:bg-primary-yellowAccent transition"
            onClick={handleAdd}
          >
            + Nuovo box
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {boxes.map(box => (
            <AudioCard
              key={box.id}
              title={box.title}
              audioUrl={box.audioUrl}
              onDelete={() => handleDelete(box.id)}
              onReplace={url => handleReplace(box.id, url)}
              onTitleChange={title => handleTitleChange(box.id, title)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

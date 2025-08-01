import React, { useRef, useState } from "react";
import AudioBoxPlayer from "@/components/AudioBoxPlayer";


interface AudioCardProps {
  title: string;
  audioUrl: string;
  onDelete: () => void;
  onReplace: (file: File) => void;
  onTitleChange: (title: string) => void;
}


const AudioCard: React.FC<AudioCardProps> = ({ title, audioUrl, onDelete, onReplace, onTitleChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onReplace(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onReplace(e.target.files[0]);
    }
  };

  const handleTitleBlur = () => {
    setEditing(false);
    if (tempTitle.trim() && tempTitle !== title) {
      onTitleChange(tempTitle.trim());
    } else {
      setTempTitle(title);
    }
  };

  return (
    <div className={`rounded-card bg-frost shadow-card hover:shadow-cardHover transition-shadow flex flex-col p-6 gap-4 justify-between h-64 relative ${dragActive ? 'ring-2 ring-primary-yellow' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex justify-between items-center">
        {editing ? (
          <input
            ref={titleInputRef}
            className="text-obsidian text-h3 font-medium truncate bg-transparent border-b border-primary-yellow focus:outline-none focus:border-primary-yellowAccent w-full"
            value={tempTitle}
            onChange={e => setTempTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                titleInputRef.current?.blur();
              }
            }}
            autoFocus
          />
        ) : (
          <div
            className="text-obsidian text-h3 font-medium truncate cursor-pointer"
            title={title}
            onClick={() => setEditing(true)}
          >
            {title}
          </div>
        )}
        <button
          className="ml-2 p-1 rounded hover:bg-red-100 text-red-600"
          aria-label="Elimina box"
          onClick={onDelete}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M9 10v6M15 10v6"/><path d="M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
      <AudioBoxPlayer src={audioUrl} />
      <div
        className={`mt-2 flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-card cursor-pointer transition-colors ${dragActive ? 'border-primary-yellow bg-yellow-50' : 'border-gray bg-white/40'}`}
        onClick={() => inputRef.current?.click()}
        style={{ minHeight: 56 }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="text-gray text-sm select-none">Trascina qui un file audio o clicca per sostituire</span>
      </div>
    </div>
  );
};

export default AudioCard;

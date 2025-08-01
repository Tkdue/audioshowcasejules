import React, { useRef, useState } from "react";
import AudioBoxPlayer from "@/components/AudioBoxPlayer";


interface AudioCardProps {
  title: string;
  audioUrl: string;
  onDelete: () => void;
  onReplace: (url: string) => void;
  onTitleChange: (title: string) => void;
}


const AudioCard: React.FC<AudioCardProps> = ({ title, audioUrl, onDelete, onReplace, onTitleChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [editing, setEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);


  async function uploadToVercelBlob(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      alert('Errore upload: ' + (await res.text()));
      return null;
    }
    const data = await res.json();
    return data.url;
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const url = await uploadToVercelBlob(e.dataTransfer.files[0]);
      if (url) onReplace(url);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await uploadToVercelBlob(e.target.files[0]);
      if (url) onReplace(url);
    }
  };

  // onReplaceUrl non più necessario, ora onReplace accetta direttamente l'url

  const handleTitleBlur = () => {
    setEditing(false);
    if (tempTitle.trim() && tempTitle !== title) {
      onTitleChange(tempTitle.trim());
    } else {
      setTempTitle(title);
    }
  };

  return (
    <div
      className={`rounded-card bg-[#10182A] border border-[#232C43] shadow-lg hover:shadow-2xl transition-shadow flex flex-col p-6 gap-4 justify-between min-h-64 relative ${dragActive ? 'ring-2 ring-primary-yellow' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex justify-between items-center mb-2">
        {editing ? (
          <input
            ref={titleInputRef}
            className="text-white text-xl font-bold bg-transparent border-b border-primary-yellow focus:outline-none focus:border-primary-yellowAccent w-full px-1"
            value={tempTitle}
            onChange={e => setTempTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={e => {
              if (e.key === 'Enter') titleInputRef.current?.blur();
            }}
            autoFocus
          />
        ) : (
          <div
            className="text-white text-xl font-bold truncate cursor-pointer"
            title={title}
            onClick={() => setEditing(true)}
          >
            {title}
          </div>
        )}
        <div className="flex gap-2 ml-2">
          <button
            className="p-1 rounded hover:bg-[#232C43] text-primary-yellow"
            aria-label="Modifica titolo"
            onClick={() => setEditing(true)}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
          </button>
          <button
            className="p-1 rounded hover:bg-[#232C43] text-red-500"
            aria-label="Elimina box"
            onClick={onDelete}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="14" height="11" rx="2"/><path d="M8 10v4M12 10v4"/><path d="M9 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <AudioBoxPlayer src={audioUrl} />
      </div>
      <div
        className={`mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-card cursor-pointer transition-colors w-full py-4 ${dragActive ? 'border-primary-yellow bg-yellow-50/10' : 'border-[#232C43] bg-[#151E33]'}`}
        onClick={() => inputRef.current?.click()}
        style={{ minHeight: 80 }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <svg width="32" height="32" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2"><path d="M16 4v16m0 0l-6-6m6 6l6-6"/><rect x="4" y="20" width="24" height="4" rx="2"/></svg>
        <span className="text-primary-yellow font-semibold text-base select-none"><span className="underline">Click to upload</span> or drag and drop</span>
        <span className="text-gray text-xs mt-1">MP3 or WAV (Max 2MB)</span>
      </div>
    </div>
  );
};

export default AudioCard;

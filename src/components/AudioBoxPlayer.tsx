import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface AudioBoxPlayerProps {
  src: string;
}

const AudioBoxPlayer: React.FC<AudioBoxPlayerProps> = ({ src }) => {
  return (
    <div className="w-full">
      <AudioPlayer
        src={src}
        showJumpControls={false}
        customAdditionalControls={[]}
        layout="horizontal"
        className="rounded-lg shadow-card bg-frost"
        style={{ background: "transparent" }}
      />
    </div>
  );
};

export default AudioBoxPlayer;

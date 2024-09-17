import React from "react";
import { twMerge } from "tailwind-merge";

interface VideoProps {
  src: string;
  type?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  width?: number;
  height?: number;
  className?: string;
}

const Video: React.FC<VideoProps> = ({
  src,
  type = "video/mp4", // default to mp4
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  poster,
  width = 640,
  height = 360,
  className = "",
}) => {
  return (
    <video
      className={twMerge("", className)}
      width={width}
      height={height}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      poster={poster}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;

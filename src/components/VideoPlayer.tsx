import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  startTime: number;
  endTime: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  startTime,
  endTime,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime, src]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.currentTime >= endTime) {
        videoRef.current.pause();
        videoRef.current.currentTime = startTime;
      }
    };

    const videoElement = videoRef.current;
    videoElement?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [endTime, startTime]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        {" "}
        {/* 16:9 Aspect Ratio */}
        <video
          ref={videoRef}
          src={src}
          className="absolute top-0 left-0 w-full h-full"
          controls
          controlsList="nodownload"
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = startTime;
            }
          }}
        />
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">
        Start: {startTime.toFixed(2)}s | End: {endTime.toFixed(2)}s | Duration:{" "}
        {(endTime - startTime).toFixed(2)}s
      </div>
    </div>
  );
};

export default VideoPlayer;

"use client";
import React, { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Timeline from "../components/Timeline";
import TrimControls from "../components/TrimControls";

const Home: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);

      // Get video duration
      const video = document.createElement("video");
      video.src = url;
      video.onloadedmetadata = () => {
        setDuration(video.duration);
        setEndTime(video.duration);
      };
    }
  };

  const handleTrimChange = (start: number, end: number) => {
    setStartTime(Math.max(0, Math.min(start, end - 0.1)));
    setEndTime(Math.min(duration, Math.max(end, start + 0.1)));
  };

  const resetVideo = () => {
    setVideoSrc("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Video Trimmer</h1>
      {!videoSrc && (
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-6 p-20 border  border-dotted h-52 w-full sm:w-1/2"
        />
      )}

      {videoSrc && (
        <>
          <div className="flex justify-between border-b mb-6 pb-4">
            <div className="font-medium text-2xl">Edit your file</div>
            <div
              onClick={() => resetVideo()}
              className="border px-3 py-2 rounded-md cursor-pointer border-red-500"
            >
              Reset
            </div>
          </div>
          <VideoPlayer src={videoSrc} startTime={startTime} endTime={endTime} />
          <Timeline
            duration={duration}
            startTime={startTime}
            endTime={endTime}
            onTrimChange={handleTrimChange}
          />
          <TrimControls
            startTime={startTime}
            endTime={endTime}
            duration={duration}
            onStartTimeChange={(time) => handleTrimChange(time, endTime)}
            onEndTimeChange={(time) => handleTrimChange(startTime, time)}
          />
        </>
      )}
    </div>
  );
};

export default Home;

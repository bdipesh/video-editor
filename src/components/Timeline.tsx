import React, { useState, useEffect } from "react";

interface TimelineProps {
  duration: number;
  startTime: number;
  endTime: number;
  onTrimChange: (start: number, end: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  duration,
  startTime,
  endTime,
  onTrimChange,
}) => {
  const [internalStart, setInternalStart] = useState(startTime);
  const [internalEnd, setInternalEnd] = useState(endTime);

  useEffect(() => {
    setInternalStart(startTime);
    setInternalEnd(endTime);
  }, [startTime, endTime]);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = Number(e.target.value);
    setInternalStart(newStart);
    onTrimChange(newStart, internalEnd);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = Number(e.target.value);
    setInternalEnd(newEnd);
    onTrimChange(internalStart, newEnd);
  };

  return (
    <div className="mt-6">
      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={internalStart}
        onChange={handleStartChange}
        className="w-full mb-2"
      />
      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={internalEnd}
        onChange={handleEndChange}
        className="w-full mb-4"
      />
      <div className="text-sm text-gray-600">
        Start: {internalStart.toFixed(2)}s | End: {internalEnd.toFixed(2)}s |
        Duration: {(internalEnd - internalStart).toFixed(2)}s
      </div>
    </div>
  );
};

export default Timeline;

import React from "react";

interface TrimControlsProps {
  startTime: number;
  endTime: number;
  duration: number;
  onStartTimeChange: (time: number) => void;
  onEndTimeChange: (time: number) => void;
}

const TrimControls: React.FC<TrimControlsProps> = ({
  startTime,
  endTime,
  duration,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between mt-4">
      <label className="mb-2 sm:mb-0">
        <span className="mr-2">Start Time:</span>
        <input
          type="number"
          value={startTime.toFixed(2)}
          onChange={(e) => onStartTimeChange(Number(e.target.value))}
          step={0.1}
          min={0}
          max={endTime - 0.1}
          className="border rounded px-2 py-1"
        />
      </label>
      <label>
        <span className="mr-2">End Time:</span>
        <input
          type="number"
          value={endTime.toFixed(2)}
          onChange={(e) => onEndTimeChange(Number(e.target.value))}
          step={0.1}
          min={startTime + 0.1}
          max={duration}
          className="border rounded px-2 py-1"
        />
      </label>
    </div>
  );
};

export default TrimControls;

import React, { useState, useEffect, useRef } from 'react';

const beepSoundUrl =
  'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg';

export const TimerWidget = () => {
  // User inputs for minutes and seconds (before start)
  const [inputMinutes, setInputMinutes] = useState(25);
  const [inputSeconds, setInputSeconds] = useState(0);

  // Total seconds state for countdown
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Normalize input values into total seconds whenever inputs change and timer not running
  useEffect(() => {
    if (!isRunning) {
      const normalizedSeconds = Math.min(59, Math.max(0, inputSeconds));
      const normalizedMinutes = Math.min(59, Math.max(0, inputMinutes));
      setInputMinutes(normalizedMinutes);
      setInputSeconds(normalizedSeconds);
      setTotalSeconds(normalizedMinutes * 60 + normalizedSeconds);
    }
  }, [inputMinutes, inputSeconds, isRunning]);

  useEffect(() => {
    if (!isRunning) {
      // If not running, no interval needed
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (totalSeconds <= 0) {
      // Time is up
      setIsRunning(false);
      audioRef.current?.play();
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          // Play sound and stop timer at 0
          audioRef.current?.play();
          setIsRunning(false);
          if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, totalSeconds]);

  function resetTimer() {
    setIsRunning(false);
    setTotalSeconds(inputMinutes * 60 + inputSeconds);
  }

  // Format totalSeconds as MM:SS
  const displayMinutes = Math.floor(totalSeconds / 60);
  const displaySeconds = totalSeconds % 60;

  function formatTime(min: number, sec: number) {
    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  }

  // Handle input changes only if not running
  function handleMinutesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isRunning) {
      const val = Number(e.target.value);
      if (!isNaN(val)) setInputMinutes(val);
    }
  }

  function handleSecondsChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isRunning) {
      const val = Number(e.target.value);
      if (!isNaN(val)) setInputSeconds(val);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xs w-full flex flex-col items-center space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Timer</h3>

      {/* Inputs for minutes and seconds */}
      <div className="flex space-x-4 mb-2">
        <label className="flex flex-col items-center text-sm text-gray-600">
          Minutes
          <input
            type="number"
            min={0}
            max={59}
            value={inputMinutes}
            onChange={handleMinutesChange}
            disabled={isRunning}
            className="w-16 mt-1 p-1 text-center border rounded"
          />
        </label>
        <label className="flex flex-col items-center text-sm text-gray-600">
          Seconds
          <input
            type="number"
            min={0}
            max={59}
            value={inputSeconds}
            onChange={handleSecondsChange}
            disabled={isRunning}
            className="w-16 mt-1 p-1 text-center border rounded"
          />
        </label>
      </div>

      {/* Timer display */}
      <div className="text-5xl font-mono text-blue-600 select-none">
        {formatTime(displayMinutes, displaySeconds)}
      </div>

      {/* Controls */}
      <div className="flex space-x-3">
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Pause
          </button>
        )}
        <button
          onClick={resetTimer}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      {/* Audio for beep */}
      <audio ref={audioRef} src={beepSoundUrl} preload="auto" />
    </div>
  );
};

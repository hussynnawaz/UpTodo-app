import React, { createContext, useState, useRef, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [studyPurpose, setStudyPurpose] = useState('');
  const [endTime, setEndTime] = useState(null); // ✅ Add this
  const [showEndModal, setShowEndModal] = useState(false); // ✅ Add this
  const [modalMessage, setModalMessage] = useState(''); // ✅ Add this
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s > 0) return s - 1;
          if (minutes > 0) {
            setMinutes((m) => m - 1);
            return 59;
          }
          clearInterval(timerRef.current);
          setIsRunning(false);
          setModalMessage('Time is up! Great work!'); // ✅ Trigger modal message
          setShowEndModal(true); // ✅ Show modal
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, minutes]);

  return (
    <TimerContext.Provider
      value={{
        isRunning, setIsRunning,
        minutes, setMinutes,
        seconds, setSeconds,
        studyPurpose, setStudyPurpose,
        endTime, setEndTime, // ✅ Provide to context
        showEndModal, setShowEndModal, // ✅ Provide to context
        modalMessage, setModalMessage, // ✅ Provide to context
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

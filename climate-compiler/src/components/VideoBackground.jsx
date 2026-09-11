import React, { useEffect, useRef } from 'react';

export default function VideoBackground({ climate }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [climate.id]);
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        key={climate.id}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        loop muted playsInline autoPlay
      >
        <source src={climate.video} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: climate.palette.bg, opacity: 0.65 }} />
    </div>
  );
}

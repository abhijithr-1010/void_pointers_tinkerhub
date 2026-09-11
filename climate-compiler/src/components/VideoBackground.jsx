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
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        key={climate.id}
        className="absolute inset-0 w-full h-full object-cover"
        loop muted playsInline autoPlay
      >
        <source src={climate.video} type="video/mp4" />
      </video>
      {/* Video dimming overlay based on climate */}
      <div 
        className="absolute inset-0 transition-colors duration-1000" 
        style={{ 
          backgroundColor: climate.id === 'sunshine' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.45)',
          mixBlendMode: climate.id === 'storm' ? 'multiply' : 'normal'
        }} 
      />
    </div>
  );
}

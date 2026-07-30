import {
  useEffect,
  useRef,
  useState,
} from "react";

interface CinematicBeachBackgroundProps {
  variant?: "opening" | "home";
}

function CinematicBeachBackground({
  variant = "home",
}: CinematicBeachBackgroundProps) {
  const backgroundRef =
    useRef<HTMLDivElement>(null);

  const [videoLoaded, setVideoLoaded] =
    useState(false);

  useEffect(() => {
    const background =
      backgroundRef.current;

    if (!background) {
      return;
    }

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const horizontalPosition =
        event.clientX /
          window.innerWidth -
        0.5;

      const verticalPosition =
        event.clientY /
          window.innerHeight -
        0.5;

      background.style.setProperty(
        "--cinematic-x",
        `${horizontalPosition}`
      );

      background.style.setProperty(
        "--cinematic-y",
        `${verticalPosition}`
      );
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className={`cinematic-beach cinematic-beach-${variant} ${
        videoLoaded
          ? "cinematic-video-ready"
          : "cinematic-video-loading"
      }`}
      aria-hidden="true"
    >
      {/* Live beach video */}
      <video
        className="cinematic-beach-video"
        src="/videos/beach-cinematic.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() =>
          setVideoLoaded(true)
        }
      />

      {/* Video fallback */}
      <div className="cinematic-video-fallback">
        <div className="fallback-sun" />
      </div>

      {/* Cinematic color and lighting */}
      <div className="cinematic-light-overlay" />
      <div className="cinematic-sun-flare" />
      <div className="cinematic-vignette" />

      {/* Animated clouds */}
      <div className="cinematic-cloud cinematic-cloud-one">
        <span />
        <span />
        <span />
      </div>

      <div className="cinematic-cloud cinematic-cloud-two">
        <span />
        <span />
        <span />
      </div>

      {/* Flying aircraft */}
      <div className="cinematic-plane-route">
        <div className="cinematic-plane-wrapper">
          <div className="cinematic-flight-trail">
            <span />
            <span />
            <span />
          </div>

          <div className="cinematic-plane-glow" />

          <svg
            className="cinematic-plane"
            viewBox="0 0 260 135"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id={`cinematicPlaneBody-${variant}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                />

                <stop
                  offset="55%"
                  stopColor="#e0f2fe"
                />

                <stop
                  offset="100%"
                  stopColor="#60a5fa"
                />
              </linearGradient>

              <linearGradient
                id={`cinematicPlaneWing-${variant}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#dbeafe"
                />

                <stop
                  offset="100%"
                  stopColor="#1d4ed8"
                />
              </linearGradient>

              <filter
                id={`cinematicPlaneShadow-${variant}`}
              >
                <feDropShadow
                  dx="0"
                  dy="10"
                  stdDeviation="8"
                  floodColor="#020617"
                  floodOpacity="0.55"
                />
              </filter>
            </defs>

            <g
              filter={`url(#cinematicPlaneShadow-${variant})`}
            >
              {/* Main aircraft body */}
              <path
                d="M17 68 C68 54 142 48 224 55 C245 57 255 63 255 68 C255 74 243 79 223 80 C141 83 68 79 17 72 Z"
                fill={`url(#cinematicPlaneBody-${variant})`}
              />

              {/* Aircraft nose */}
              <path
                d="M222 55 C244 57 255 63 255 68 C255 74 243 79 222 80 C230 72 230 63 222 55 Z"
                fill="#eff6ff"
              />

              {/* Cockpit window */}
              <path
                d="M208 57 L230 59 L239 65 L209 64 Z"
                fill="#082f49"
              />

              {/* Upper wing */}
              <path
                d="M115 56 L151 7 C157 0 168 1 173 7 L154 59 Z"
                fill={`url(#cinematicPlaneWing-${variant})`}
              />

              {/* Lower wing */}
              <path
                d="M106 77 L157 128 C163 134 174 132 180 125 L151 77 Z"
                fill={`url(#cinematicPlaneWing-${variant})`}
              />

              {/* Tail */}
              <path
                d="M50 62 L27 25 C23 19 31 14 38 20 L82 59 Z"
                fill="#2563eb"
              />

              {/* Lower tail */}
              <path
                d="M52 76 L31 99 C26 105 34 109 41 103 L84 76 Z"
                fill="#60a5fa"
              />

              {/* Windows */}
              <circle
                cx="192"
                cy="65"
                r="3"
                fill="#0c4a6e"
              />

              <circle
                cx="179"
                cy="65"
                r="3"
                fill="#0c4a6e"
              />

              <circle
                cx="166"
                cy="65"
                r="3"
                fill="#0c4a6e"
              />

              <circle
                cx="153"
                cy="65"
                r="3"
                fill="#0c4a6e"
              />

              <circle
                cx="140"
                cy="65"
                r="3"
                fill="#0c4a6e"
              />

              {/* Engines */}
              <ellipse
                cx="145"
                cy="89"
                rx="17"
                ry="9"
                fill="#1e3a8a"
              />

              <ellipse
                cx="169"
                cy="91"
                rx="16"
                ry="8"
                fill="#1e40af"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Birds */}
      <div className="cinematic-birds">
        <span>⌄</span>
        <span>⌄</span>
        <span>⌄</span>
      </div>

      {/* Wave-light overlays */}
      <div className="cinematic-wave-light cinematic-wave-light-one" />
      <div className="cinematic-wave-light cinematic-wave-light-two" />

      {/* Intro depth particles */}
      <div className="cinematic-particles">
        {Array.from({
          length: 14,
        }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

export default CinematicBeachBackground;
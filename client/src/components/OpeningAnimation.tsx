import CinematicBeachBackground from "./CinematicBeachBackground";

interface OpeningAnimationProps {
  isClosing: boolean;
}

function OpeningAnimation({
  isClosing,
}: OpeningAnimationProps) {
  return (
    <div
      className={`voyage-loader ${
        isClosing
          ? "voyage-loader-closing"
          : ""
      }`}
      role="status"
      aria-label="Loading VoyageAI"
    >
      <CinematicBeachBackground variant="opening" />

      <div className="loader-background">
        <div className="loader-orb loader-orb-one" />
        <div className="loader-orb loader-orb-two" />
        <div className="loader-orb loader-orb-three" />

        <div className="loader-grid" />
      </div>

      <div className="loader-scene">
        <div className="loader-globe">
          <div className="globe-line globe-line-one" />
          <div className="globe-line globe-line-two" />
          <div className="globe-line globe-line-three" />

          <div className="globe-center">
            🌍
          </div>
        </div>

        <div className="plane-orbit">
          <div className="plane-icon">
            ✈
          </div>
        </div>
      </div>

      <div className="loader-content">
        <h1 className="loader-logo">
          Voyage
          <span>AI</span>
        </h1>

        <p className="loader-description">
          Your intelligent journey starts here
        </p>

        <div className="loader-progress">
          <div className="loader-progress-bar" />
        </div>

        <p className="loader-status">
          Preparing your adventure...
        </p>
      </div>

      <div className="loader-particles">
        {Array.from({
          length: 14,
        }).map((_, index) => (
          <span
            key={index}
            style={
              {
                "--particle-index": index,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

export default OpeningAnimation;
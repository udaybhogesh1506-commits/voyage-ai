import {
  useRef,
} from "react";

function OwnerSection() {
  const cardRef =
    useRef<HTMLDivElement>(null);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rectangle =
      card.getBoundingClientRect();

    const horizontalPosition =
      event.clientX -
      rectangle.left;

    const verticalPosition =
      event.clientY -
      rectangle.top;

    const rotateY =
      (horizontalPosition /
        rectangle.width -
        0.5) *
      10;

    const rotateX =
      (0.5 -
        verticalPosition /
          rectangle.height) *
      10;

    card.style.setProperty(
      "--owner-rotate-x",
      `${rotateX}deg`
    );

    card.style.setProperty(
      "--owner-rotate-y",
      `${rotateY}deg`
    );

    card.style.setProperty(
      "--owner-light-x",
      `${horizontalPosition}px`
    );

    card.style.setProperty(
      "--owner-light-y",
      `${verticalPosition}px`
    );
  };

  const resetCard = () => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    card.style.setProperty(
      "--owner-rotate-x",
      "0deg"
    );

    card.style.setProperty(
      "--owner-rotate-y",
      "0deg"
    );
  };

  return (
    <section
      id="owner"
      className="owner-section"
    >
      <div className="owner-background">
        <div className="owner-orb owner-orb-one" />
        <div className="owner-orb owner-orb-two" />

        <div className="owner-stars">
          {Array.from({
            length: 18,
          }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>

      <div className="owner-container">
        <div className="owner-heading">
          <span className="owner-eyebrow">
            THE PERSON BEHIND THE JOURNEY
          </span>

          <h2>
            Meet the Creator
          </h2>

          <p>
            Turning travel ideas into
            intelligent digital experiences.
          </p>
        </div>

        <div
          ref={cardRef}
          className="owner-card"
          onMouseMove={
            handleMouseMove
          }
          onMouseLeave={
            resetCard
          }
        >
          <div className="owner-card-light" />

          <div className="owner-visual">
            <div className="owner-photo-orbit">
              <span className="orbit-dot orbit-dot-one" />
              <span className="orbit-dot orbit-dot-two" />
              <span className="orbit-dot orbit-dot-three" />
            </div>

            <div className="owner-photo-frame">
              <img
                src="/images/uday-bhogesh.jpeg"
                alt="Jarugu Uday Bhogesh, founder and developer of VoyageAI"
                className="owner-photo"
              />

              <div className="owner-photo-shine" />
            </div>

            <div className="owner-status">
              <span className="owner-status-dot" />

              Available for opportunities
            </div>
          </div>

          <div className="owner-details">
            <div className="owner-founder-badge">
              <span>✦</span>
              Founder of VoyageAI
            </div>

            <h3>
              Jarugu Uday Bhogesh
            </h3>

            <p className="owner-role">
              Founder &amp; Full-Stack Developer
            </p>

            <p className="owner-description">
              I created VoyageAI to make
              travel planning smarter,
              simpler and more personal.
              It combines full-stack
              development, artificial
              intelligence and modern
              design to help travelers
              create meaningful journeys.
            </p>

            <div className="owner-skills">
              <span>React</span>
              <span>TypeScript</span>
              <span>Node.js</span>
              <span>MongoDB</span>
              <span>AI Integration</span>
            </div>

            <div className="owner-links">
              <a
                href="https://github.com/udaybhogesh1506-commits"
                target="_blank"
                rel="noopener noreferrer"
                className="owner-link owner-github"
                aria-label="Visit Uday Bhogesh's GitHub profile"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.24c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.58-.29-5.29-1.29-5.29-5.74 0-1.27.45-2.3 1.2-3.12-.12-.29-.52-1.48.11-3.08 0 0 .97-.31 3.17 1.19a11.1 11.1 0 0 1 5.77 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.79.11 3.08.75.82 1.2 1.85 1.2 3.12 0 4.46-2.72 5.44-5.3 5.73.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
                  />
                </svg>

                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/uday-jarugu-616896339"
                target="_blank"
                rel="noopener noreferrer"
                className="owner-link owner-linkedin"
                aria-label="Visit Uday Bhogesh's LinkedIn profile"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M5.2 3.6a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2ZM3 10.5h4.4V21H3V10.5Zm7.1 0h4.2v1.44h.06c.58-1.1 2.01-2.26 4.14-2.26 4.43 0 5.25 2.92 5.25 6.71V21h-4.39v-4.08c0-.97-.02-2.23-1.36-2.23-1.36 0-1.57 1.06-1.57 2.16V21h-4.39V10.5Z"
                  />
                </svg>

                LinkedIn
              </a>

              <a
                href="mailto:udaybhogesh17@gmail.com"
                className="owner-link owner-email"
                aria-label="Email Uday Bhogesh"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M2.5 5.5A2.5 2.5 0 0 1 5 3h14a2.5 2.5 0 0 1 2.5 2.5v13A2.5 2.5 0 0 1 19 21H5a2.5 2.5 0 0 1-2.5-2.5v-13Zm3.1.5L12 11.05 18.4 6H5.6Zm13.9 2.05-6.57 5.18a1.5 1.5 0 0 1-1.86 0L4.5 8.05V18.5c0 .28.22.5.5.5h14a.5.5 0 0 0 .5-.5V8.05Z"
                  />
                </svg>

                Email Me
              </a>
            </div>
          </div>

          <div className="owner-floating-code owner-code-one">
            &lt;/&gt;
          </div>

          <div className="owner-floating-code owner-code-two">
            AI
          </div>

          <div className="owner-floating-code owner-code-three">
            ✈
          </div>
        </div>
      </div>
    </section>
  );
}

export default OwnerSection;
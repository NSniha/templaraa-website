import React from "react";
import "./JoinOpportunity.css";

import joinBg from "../../assets/images/join-bg.png";
import joinIllustration from "../../assets/images/join-illustration.png";

function JoinOpportunity({ onJoinClick }) {
  const handleJoinClick = (event) => {
    event.preventDefault();

    if (onJoinClick) {
      onJoinClick("/signup");
    }
  };

  return (
    <section className="join-opportunity-section">
      <div className="container-fluid join-opportunity-container">
        <div
          className="join-opportunity-wrapper"
          style={{ "--join-bg": `url(${joinBg})` }}
        >
          <div className="join-opportunity-content">
            <h2>Join &amp; Get a Unique Opportunity</h2>

            <p>
              Are you a designer or developer? Upload your website solutions and
              reach a global marketplace. Let your ready-made websites work for
              you — earn while others build faster.
            </p>

            <a
              href="/signup"
              className="join-opportunity-btn"
              onClick={handleJoinClick}
            >
              Join Now
            </a>
          </div>

          <div className="join-opportunity-visual">
            <img
              src={joinIllustration}
              alt="Creator working with digital setup"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinOpportunity;
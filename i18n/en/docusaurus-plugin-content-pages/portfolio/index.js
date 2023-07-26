import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import DistortionString from "@site/src/components/DistortionString";

import styles from "./index.module.scss";

export default function Portfolio() {
  return (
    <Layout>
      <div className={clsx("hero hero--dark", styles.banner)}>
        <div className="container">
          <div className={`${styles.col}`}>
            <div>
              <h1 className={clsx("hero__title", styles.title)}>
                <span>Welcome to my</span>
                PORT<strong>FOLIO</strong>
              </h1>
              <div className={styles.roleContent}>
                Here we have
                <span className={clsx("margin-left--sm", styles.role)}>
                  <DistortionString
                    contents={[
                      "E2EE Chat Website",
                      "Hand Made 2D Game Engine",
                      "Well-designed Message Bubble",
                      "Linux System Level Programming",
                      "Rendering Latex Formulas",
                      "Math Brush Platform",
                      "Exciting Texas Hold 'em",
                    ]}
                  />
                </span>
              </div>
            </div>
            <img
              src="img/お兄ちゃんはおしまい34.png"
              alt="Image alt text"
              title="Logo Title Text 1"
            />
          </div>
        </div>
      </div>

      <div className="container margin-bottom--md">
        <div className="row">
          <div className="col col--4">
            <div className={`${styles.card}`}>
              <div className="card">
                <div className="card__image">
                  <img
                    src="img/math-latex-preview.png"
                    alt="Image alt text"
                    title="Logo Title Text 1"
                  />
                </div>
                <div className="card__body">
                  <h4>Math Latex</h4>
                  <small>
                    A brushing platform for displaying mathematical formulas in
                    Latex provides a solution for migrating from pictures to
                    Latex
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <button className="button button--secondary">Like</button>
                    <button className="button button--secondary">
                      Comment
                    </button>
                    <button className="button button--secondary">Share</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.card}`}>
              <div className="card">
                <div className="card__image">
                  <img
                    src="img/football-1922-preview.png"
                    alt="Image alt text"
                    title="Logo Title Text 1"
                  />
                </div>
                <div className="card__body">
                  <h4>football 1922</h4>
                  <small>
                    Cross-platform LAN multiplayer online football game, no game
                    engine ♪~
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <button className="button button--secondary">Like</button>
                    <button className="button button--secondary">
                      Comment
                    </button>
                    <button className="button button--secondary">Share</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className={`${styles.card}`}>
              <div className="card">
                <div className="card__image">
                  <img
                    src="img/rsa-chat-web-ui-preview.png"
                    alt="Image alt text"
                    title="Logo Title Text 1"
                  />
                </div>
                <div className="card__body">
                  <h4>RSA Chat Web UI</h4>
                  <small>
                    A Web page for end-to-end encrypted communications that you
                    can use to securely exchange private data
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <button className="button button--secondary">Like</button>
                    <button className="button button--secondary">
                      Comment
                    </button>
                    <button className="button button--secondary">Share</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className={`${styles.card}`}>
              <div className="card">
                <div className="card__image">
                  <img
                    src="img/cyber-casino-preview.png"
                    alt="Image alt text"
                    title="Logo Title Text 1"
                  />
                </div>
                <div className="card__body">
                  <h4>Texas hold 'em poker</h4>
                  <small>
                    Multiplayer online Web game, save the trouble of shuffling
                    and dealing cards. Howerver, no more fiddling with the chips
                    at hand :(
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <button className="button button--secondary">Like</button>
                    <button className="button button--secondary">
                      Comment
                    </button>
                    <button className="button button--secondary">Share</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

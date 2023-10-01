import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
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
                <div className={styles.role}>
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
                    charTime={60}
                    rmCharTime={30}
                  />
                </div>
              </div>
            </div>
            <img
              src="/img/お兄ちゃんはおしまい34.webp"
              alt="Lean comfortably to the side"
              title="Take a look around ♪~"
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
                  <Link to="https://math.dar-xs.com">
                    <img
                      src="/img/math-latex-preview.webp"
                      alt="Screenshot of math-latex web page"
                      title="Math Latex Preview"
                    />
                  </Link>
                </div>
                <div className="card__body">
                  <Link to="https://math.dar-xs.com">
                    <h4>Math Latex</h4>
                  </Link>
                  <small>
                    A brushing platform for displaying mathematical formulas in
                    Latex provides a solution for migrating from pictures to
                    Latex
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <Link
                      className="button button--secondary"
                      to="https://math.dar-xs.com"
                    >
                      Visit
                    </Link>
                    <Link
                      className="button button--secondary"
                      to="https://github.com/Dar-Xs/math-latex-client"
                    >
                      GitHub
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.card}`}>
              <div className="card">
                <div className="card__image">
                  <img
                    src="/img/football-1922-preview.webp"
                    alt="Screenshot of a mini game"
                    title="Football 1922 Preview"
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
                    <Link
                      className="button button--secondary"
                      to="/blog/start-from-scratch-multi-player-soccer-game"
                    >
                      Blog
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className={`${styles.card}`}>
              <div className="card">
                <div className="card__image">
                  <Link to="https://rsa.chat.darxs.cn">
                    <img
                      src="/img/rsa-chat-web-ui-preview.webp"
                      alt="Screenshot of RSA Chat web page"
                      title="RSA Web Chat preview"
                    />
                  </Link>
                </div>
                <div className="card__body">
                  <Link to="https://rsa.chat.darxs.cn">
                    <h4>RSA Web Chat</h4>
                  </Link>
                  <small>
                    A Web page for end-to-end encrypted communications that you
                    can use to securely exchange private data
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <Link
                      className="button button--secondary"
                      to="https://rsa.chat.darxs.cn"
                    >
                      Visit
                    </Link>
                    <Link
                      className="button button--secondary"
                      to="https://github.com/Dar-Xs/RSA-Web-Chat"
                    >
                      GitHub
                    </Link>
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
                    src="/img/cyber-casino-preview.webp"
                    alt="Screenshot of Texas Hold 'em web page"
                    title="Texas Hold 'em Web preview"
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
                    <Link
                      className="button button--secondary"
                      to="/blog/texas-game-web-full-stack-development"
                    >
                      Blog
                    </Link>
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

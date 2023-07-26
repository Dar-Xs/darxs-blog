import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import DistortionString from "@site/src/components/DistortionString";
import DownloadButton from "@site/src/components/DownloadButton";

import styles from "./index.module.scss";

export default function Index() {
  const [isAn, setIsAn] = useState(false);

  return (
    <Layout>
      <div className={clsx("hero hero--dark", styles.banner)}>
        <div className="container">
          <div className={`${styles.col}`}>
            <div>
              <h1 className={clsx("hero__title", styles.title)}>
                <span>
                  Hello<span className={styles.wave}>👋</span>, I'm
                </span>
                Dr. <strong>Xiong</strong>
              </h1>
              <div className={styles.roleContent}>
                {isAn ? "An" : "A"}
                <span className={clsx("margin-left--sm", styles.role)}>
                  <DistortionString
                    contents={[
                      "Web Frontend Engineer",
                      "iOS Developer",
                      "UI/UX Designer",
                      "Open Source Developer",
                      "Craft Lovers",
                    ]}
                    setIsAn={setIsAn}
                  />
                </span>
              </div>
              <div className={styles.buttons}>
                <DownloadButton fileName="resume.pdf" fileUrl="resume.pdf">
                RÉSUMÉ
                </DownloadButton>
                <Link
                  className="button button--link button--lg color-primary-lightest"
                  to="/portfolio"
                >
                  PORTFOLIO
                </Link>
              </div>
            </div>
            <img
              src="img/お兄ちゃんはおしまい25.png"
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
                    and dealing cards. Howerver, no more fiddling with the chips at hand :(
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

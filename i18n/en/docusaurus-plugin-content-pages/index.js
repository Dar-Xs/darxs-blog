import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import DistortionString from "@site/src/components/DistortionString";

import styles from "@site/src/pages/index.module.scss";

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
                      { string: "UI/UX Designer", isAn: false },
                      "Open Source Developer",
                      "Craft Lovers",
                    ]}
                    setIsAn={setIsAn}
                    charTime={60}
                    rmCharTime={30}
                  />
                </span>
              </div>
              <div className={styles.buttons}>
                <a
                  className="button button--primary button--lg margin-right--md"
                  href="/resume.pdf"
                >
                  RÉSUMÉ
                </a>
                <Link
                  className="button button--link button--lg color-primary-lightest"
                  to="/portfolio"
                >
                  PORTFOLIO
                </Link>
              </div>
            </div>
            <img
              src="/img/お兄ちゃんはおしまい25.webp"
              alt="Waving to you warmly"
              title="Hello👋"
            />
          </div>
        </div>
      </div>

      <div className={`container padding-bottom--lg ${styles.badges}`}>
        <h2 className="margin-top--lg">Skills</h2>
        <div>
          <img alt="HTML5" src="/img/badge/HTML5.svg" />
          <img alt="CSS3" src="/img/badge/CSS3.svg" />
          <img alt="JavaScript" src="/img/badge/JAVASCRIPT.svg" />
          <img alt="Vue.js" src="/img/badge/VUE.svg" />
          <img alt="Node.js" src="/img/badge/NODE.svg" />
          <img alt="Java" src="/img/badge/JAVA.svg" />
          <img alt="Swift" src="/img/badge/SWIFT.svg" />
          <img alt="LaTeX" src="/img/badge/LATEX.svg" />
        </div>

        <h2 className="margin-top--lg">Tools</h2>
        <div>
          <img alt="VS Code" src="/img/badge/VS CODE.svg" />
          <img alt="Vercel" src="/img/badge/VERCEL.svg" />
          <img alt="Git" src="/img/badge/GIT.svg" />
          <img alt="Docker" src="/img/badge/DOCKER.svg" />
          <img alt="Quasar" src="/img/badge/QUASAR.svg" />
          <img alt="TailwindCSS" src="/img/badge/TAILWIND CSS.svg" />
          <img alt="Overleaf" src="/img/badge/OVERLEAF.svg" />
          <img alt="Xcode" src="/img/badge/XCODE.svg" />
          <img alt="Socket.io" src="/img/badge/SOCKET.IO.svg" />
          <img alt="Axios" src="/img/badge/AXIOS.svg" />
          <img alt="Font Awesome" src="/img/badge/FONT AWESOME.svg" />
          <img alt="Sketch" src="/img/badge/SKETCH.svg" />
          <img alt="Postman" src="/img/badge/POSTMAN.svg" />
          <img alt="Sass" src="/img/badge/SASS.svg" />
        </div>

        <h2 className="margin-top--lg">Learning</h2>
        <div>
          <img alt="PostCSS" src="/img/badge/POSTCSS.svg" />
          <img alt="UnoCSS" src="/img/badge/UNOCSS.svg" />
          <img alt="Python" src="/img/badge/PYTHON.svg" />
        </div>

        <h2 className="margin-top--lg">Contribute</h2>
        <div>
          <img alt="MDN Web Docs" src="/img/badge/MDN WEB DOCS.svg" />
          <img alt="GitHub" src="/img/badge/GITHUB.svg" />
        </div>
      </div>
    </Layout>
  );
}

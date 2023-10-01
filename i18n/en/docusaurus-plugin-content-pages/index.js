import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import DistortionString from "@site/src/components/DistortionString";
import DownloadButton from "@site/src/components/DownloadButton";

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
                      "UI/UX Designer",
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
          <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
          <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
          <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=222222"/>
          <img alt="Vue.js" src="https://img.shields.io/badge/Vue.js-42B883?style=for-the-badge&logo=vuedotjs&logoColor=white"/>
          <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
          <img alt="Swift" src="https://img.shields.io/badge/Swift-F05137?style=for-the-badge&logo=swift&logoColor=white"/>
          <img alt="LaTeX" src="https://img.shields.io/badge/LaTeX-008080?style=for-the-badge&logo=latex&logoColor=white"/>
        </div>
        
        <h2 className="margin-top--lg">Tools</h2>
        <div>
          <img alt="VS Code" src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>
          <img alt="Vercel" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
          <img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
          <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
          <img alt="Quasar" src="https://img.shields.io/badge/Quasar-1976D2?style=for-the-badge&logo=quasar&logoColor=white"/>
          <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
          <img alt="Overleaf" src="https://img.shields.io/badge/Overleaf-47A141?style=for-the-badge&logo=overleaf&logoColor=white"/>
          <img alt="Xcode" src="https://img.shields.io/badge/Xcode-147EFB?style=for-the-badge&logo=xcode&logoColor=white"/>
          <img alt="Socket.io" src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white"/>
          <img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
          <img alt="Font Awesome" src="https://img.shields.io/badge/Font%20Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white"/>
          <img alt="Sketch" src="https://img.shields.io/badge/Sketch-F7B500?style=for-the-badge&logo=sketch&logoColor=222222"/>
          <img alt="Postman" src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
          <img alt="Sass" src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
        </div>

        <h2 className="margin-top--lg">Learning</h2>
        <div>
          <img alt="PostCSS" src="https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white"/>
          <img alt="UnoCSS" src="https://img.shields.io/badge/UnoCSS-333333?style=for-the-badge&logo=unocss&logoColor=white"/>
          <img alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
        </div>

        <h2 className="margin-top--lg">Contribute</h2>
        <div>
          <img alt="MDN Web Docs" src="https://img.shields.io/badge/MDN%20Web%20Docs-000000?style=for-the-badge&logo=mdnwebdocs&logoColor=white"/>
          <img alt="GitHub" src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
        </div>

      </div>
    </Layout>
  );
}

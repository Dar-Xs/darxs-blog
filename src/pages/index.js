import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import DistortionString from "@site/src/components/DistortionString";
import DownloadButton from "@site/src/components/DownloadButton";

import styles from "./index.module.scss";

export default function Index() {
  return (
    <Layout>
      <div className={clsx("hero hero--dark", styles.banner)}>
        <div className="container">
          <div className={`${styles.col}`}>
            <div>
              <h1 className={clsx("hero__title", styles.title)}>
                <span>
                  Hello<span className={styles.wave}>👋</span>, 我叫
                </span>
                <strong>熊</strong>若晗
              </h1>
              <div className={styles.roleContent}>
                我是
                <span className={clsx("margin-left--sm", styles.role)}>
                  <DistortionString
                    contents={[
                      "Web 前端工程师",
                      "iOS 开发工程师",
                      "UI/UX 设计师",
                      "开源开发者",
                      "手工爱好者",
                    ]}
                  />
                </span>
              </div>
              <div className={styles.buttons}>
                <DownloadButton fileName="resume.pdf" fileUrl="resume.pdf">
                  简历
                </DownloadButton>
                <Link
                  className="button button--link button--lg color-primary-lightest"
                  to="/portfolio"
                >
                  作品
                </Link>
              </div>
            </div>
            <img
              src="/img/お兄ちゃんはおしまい25.webp"
              alt="热情地向你挥手"
              title="Hello👋"
            />
          </div>
        </div>
      </div>

      <div className={`container padding-bottom--lg ${styles.badges}`}>
        <h2 className="margin-top--lg">技能</h2>        
        <div>
          <img alt="HTML5" src="/img/badge/HTML5.svg"/>
          <img alt="CSS3" src="/img/badge/CSS3.svg"/>
          <img alt="JavaScript" src="/img/badge/JAVASCRIPT.svg"/>
          <img alt="Vue.js" src="/img/badge/VUE.svg"/>
          <img alt="Node.js" src="/img/badge/NODE.svg"/>
          <img alt="Swift" src="/img/badge/SWIFT.svg"/>
          <img alt="LaTeX" src="/img/badge/LATEX.svg"/>
        </div>
        
        <h2 className="margin-top--lg">工具</h2>
        <div>
          <img alt="VS Code" src="/img/badge/VS CODE.svg"/>
          <img alt="Vercel" src="/img/badge/VERCEL.svg"/>
          <img alt="Git" src="/img/badge/GIT.svg"/>
          <img alt="Docker" src="/img/badge/DOCKER.svg"/>
          <img alt="Quasar" src="/img/badge/QUASAR.svg"/>
          <img alt="TailwindCSS" src="/img/badge/TAILWIND CSS.svg"/>
          <img alt="Overleaf" src="/img/badge/OVERLEAF.svg"/>
          <img alt="Xcode" src="/img/badge/XCODE.svg"/>
          <img alt="Socket.io" src="/img/badge/SOCKET.IO.svg"/>
          <img alt="Axios" src="/img/badge/AXIOS.svg"/>
          <img alt="Font Awesome" src="/img/badge/FONT AWESOME.svg"/>
          <img alt="Sketch" src="/img/badge/SKETCH.svg"/>
          <img alt="Postman" src="/img/badge/POSTMAN.svg"/>
          <img alt="Sass" src="/img/badge/SASS.svg"/>
        </div>

        <h2 className="margin-top--lg">学习</h2>
        <div>
          <img alt="PostCSS" src="/img/badge/POSTCSS.svg"/>
          <img alt="UnoCSS" src="/img/badge/UNOCSS.svg"/>
          <img alt="Python" src="/img/badge/PYTHON.svg"/>
        </div>

        <h2 className="margin-top--lg">贡献</h2>
        <div>
          <img alt="MDN Web Docs" src="/img/badge/MDN WEB DOCS.svg"/>
          <img alt="GitHub" src="/img/badge/GITHUB.svg"/>
        </div>

      </div>
    </Layout>
  );
}

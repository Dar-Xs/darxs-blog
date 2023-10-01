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
                <span>
                  欢迎光临 我的
                </span>
                <strong>作品</strong>集
              </h1>
              <div className={styles.roleContent}>
                这里有
                <div className={styles.role}>
                  <DistortionString
                    contents={[
                      "端到端加密聊天",
                      "手搓2D游戏引擎",
                      "精心设计的消息气泡",
                      "Linux系统级编程",
                      "渲染Latex公式",
                      "数学刷题平台",
                      "激动人心的德扑",
                    ]}
                  />
                </div>
              </div>
            </div>
            <img
              src="/img/お兄ちゃんはおしまい34.webp"
              alt="舒适地靠在一边"
              title="随便看看吧 ♫~"
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
                      alt="math-latex网页截图"
                      title="Math Latex预览"
                    />
                  </Link>
                </div>
                <div className="card__body">
                  <Link to="https://math.dar-xs.com">
                    <h4>Math Latex</h4>
                  </Link>
                  <small>
                    使用 Latex 展示数学公式的刷题平台，提供了一个从图片迁移到
                    Latex 的解决方案
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <Link
                      className="button button--secondary"
                      to="https://math.dar-xs.com"
                    >
                      前往站点
                    </Link>
                    <Link
                      className="button button--secondary"
                      to="https://github.com/Dar-Xs/math-latex-client"
                    >
                      GitHub 仓库
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
                    alt="进行中小游戏的截图"
                    title="Football 1922 预览"
                  />
                </div>
                <div className="card__body">
                  <h4>football 1922</h4>
                  <small>
                    跨平台局域网多人在线足球游戏，没有使用游戏引擎哦 ♫~
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <Link
                      className="button button--secondary"
                      to="/blog/start-from-scratch-multi-player-soccer-game"
                    >
                      查看博文
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
                      alt="RSA Chat 网页截图"
                      title="RSA Web Chat 预览"
                    />
                  </Link>
                </div>
                <div className="card__body">
                  <Link to="https://rsa.chat.darxs.cn">
                    <h4>RSA Web Chat</h4>
                  </Link>
                  <small>
                    用于端到端加密通信的 Web 网页，你可以用它安全地传递隐私数据
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <Link
                      className="button button--secondary"
                      to="https://rsa.chat.darxs.cn"
                    >
                      前往站点
                    </Link>
                    <Link
                      className="button button--secondary"
                      to="https://github.com/Dar-Xs/RSA-Web-Chat"
                    >
                      GitHub 仓库
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
                    alt="德州扑克网页截图"
                    title="德州扑克 Web 端预览"
                  />
                </div>
                <div className="card__body">
                  <h4>德州扑克</h4>
                  <small>
                    多人在线 Web
                    游戏，省去了洗牌发牌结算烦恼，代价是不能摆弄手边的筹码了:(
                  </small>
                </div>
                <div className="card__footer">
                  <div className="button-group button-group--block">
                    <Link
                      className="button button--secondary"
                      to="/blog/texas-game-web-full-stack-development"
                    >
                      查看博文
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

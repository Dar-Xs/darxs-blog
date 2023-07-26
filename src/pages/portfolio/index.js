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
                <span>
                  欢迎光临 我的
                </span>
                <strong>作品</strong>集
              </h1>
              <div className={styles.roleContent}>
                这里有
                <span className={clsx("margin-left--sm", styles.role)}>
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
                    使用 Latex 展示数学公式的刷题平台，提供了一个从图片迁移到
                    Latex 的解决方案
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
                    跨平台局域网多人在线足球游戏，没有使用游戏引擎哦
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
                    用于端到端加密通信的 Web 网页，你可以用它安全地传递隐私数据
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
                  <h4>德州扑克</h4>
                  <small>
                    多人在线 Web
                    游戏，省去了洗牌发牌结算烦恼，代价是不能摆弄手边的筹码了:(
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

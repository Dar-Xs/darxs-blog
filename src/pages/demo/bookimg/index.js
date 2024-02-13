import React from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.scss";
import { useState, useRef } from "react";

export default function Portfolio() {
  const [xOffsetAngle, setXOffsetAngle] = useState(0);
  const [yOffsetAngle, setYOffsetAngle] = useState(0);
  const [transitionTime, setTransitionTime] = useState(0.5);
  const bookContainer = useRef(null);
  const [resetTimeout, setResetTimeout] = useState(null);
  const moveTo = (e) => {
    if (!bookContainer.current) return;
    setTransitionTime(Math.max(transitionTime * 0.9, 0.1));
    const rect = bookContainer.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setXOffsetAngle(-((y - rect.height / 2) / rect.height) * 20);
    setYOffsetAngle(((x - rect.width / 2) / rect.width) * 30);
    clearTimeout(resetTimeout);
    setResetTimeout(
      setTimeout(() => {
        focus();
      }, 1000)
    );
  };
  const moveReset = () => {
    setTransitionTime(0.5);
    setXOffsetAngle(0);
    setYOffsetAngle(0);
    clearTimeout(resetTimeout);
  };
  const focus = () => {
    setTransitionTime(0.5);
    setXOffsetAngle(0);
    setYOffsetAngle(30);
  };

  return (
    <Layout>
      <div className={`${styles.hstack} ${styles["view-height"]}`}>
        <div className={`${styles.vstack} ${styles["full-width"]}`}>
          <div ref={bookContainer} className={styles["book-container"]}>
            <div
              className={styles.book}
              onMouseMove={moveTo}
              onMouseLeave={moveReset}
              style={{
                transform: `rotateY(${yOffsetAngle}deg) rotateX(${xOffsetAngle}deg)`,
                transition: `all ease ${transitionTime}s`,
              }}
            >
              <div className={styles["book-back"]}></div>
              <div className={styles["book-edge"]}></div>
              <img
                className={styles["book-face"]}
                src="/img/demo/bookimg/vue.jpg"
              />
            </div>
          </div>
          <h2 className={styles.description}>用 HTML & CSS 做的书形组件</h2>
          <p>
            鼠标悬浮/手指点击 会旋转这本书
            <br />
            （虽然是用 React 写的👀）
          </p>
        </div>
      </div>
    </Layout>
  );
}

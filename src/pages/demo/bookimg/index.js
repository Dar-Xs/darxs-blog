import React from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.scss";
import { useState, useRef, useEffect } from "react";

export default function BookImg() {
  const focusState = useRef(0);
  const isFirstRender = useRef(true);
  const [scale, setScale] = useState(1);
  const [xOffsetAngle, setXOffsetAngle] = useState(0);
  const [yOffsetAngle, setYOffsetAngle] = useState(0);
  const [transitionTime, setTransitionTime] = useState(0.5);
  const bookContainer = useRef(null);
  const moveTo = (e) => {
    if (!bookContainer.current) return;
    const rect = bookContainer.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setScale(1.08);
    if (focusState.current === 1) {
      setXOffsetAngle(-((y - rect.height / 2) / rect.height) * 20);
      setYOffsetAngle(((x - rect.width / 2) / rect.width) * 20);
    } else if (focusState.current === 2) {
      setTransitionTime(Math.max(transitionTime * 0.9, 0.1));
      setXOffsetAngle(-((y - rect.height / 2) / rect.height) * 20);
      setYOffsetAngle(((x - rect.width / 2) / rect.width) * 10 + 30);
    }
  };

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   const timeout = setTimeout(() => {
  //     if (focusState.current === 1) {
  //       focus();
  //     }
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [xOffsetAngle, yOffsetAngle]);

  const moveReset = () => {
    focusState.current = 0;
    setTransitionTime(0.5);
    setXOffsetAngle(0);
    setYOffsetAngle(0);
    setScale(1);
  };
  const focus = () => {
    focusState.current = 2;
    setTransitionTime(0.5);
    // setXOffsetAngle(0);
    setYOffsetAngle(yOffsetAngle / 2 + 30);
  };

  return (
    <Layout>
      <div className={`${styles.hstack} ${styles["view-height"]}`}>
        <div className={`${styles.vstack} ${styles["full-width"]}`}>
          <div ref={bookContainer} className={styles["book-container"]}>
            <div
              className={styles.book}
              onMouseMove={moveTo}
              onMouseEnter={() => {
                focusState.current = 1;
                setTimeout(() => {
                  if (focusState.current === 1) {
                    focus();
                  }
                }, 1000);
              }}
              onMouseLeave={moveReset}
              style={{
                transform: `rotateX(${xOffsetAngle}deg) rotateY(${yOffsetAngle}deg) scale(${scale})`,
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
          <p style={{ textAlign: "center" }}>
            鼠标悬浮/手指点击 会旋转这本书
            <br />
            （虽然是用 React 写的👀）
          </p>
        </div>
      </div>
    </Layout>
  );
}

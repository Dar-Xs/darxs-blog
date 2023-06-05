import React from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import DistortionString from '../../components/DistortionString';

import styles from './index.module.scss';

function Card({header, body, footer}) {
  return (
    <div className="card-demo">
      <div className="card">
        <div className="card__header">
          <h3>{header}</h3>
        </div>
        <div className="card__body">
          <p>{body}</p>
        </div>
        <div className="card__footer">
          <button className="button button--secondary button--block">{footer}</button>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [isAn, setIsAn] = useState(false);

  return (
    <Layout>
      <div>
        <div className={clsx("hero hero--dark", styles.banner)}
             style={{height: "calc(100vh - 60px)"}}
        >
          <div className="container">
            <h1 className={clsx("hero__title", styles.title)}>
              <span>Hello<span className={styles.wave}>👋</span>, I'm</span>
              Dr.<strong>Xiong</strong>
            </h1>
            <div className={styles.roleContent}>
             {isAn ? "An" : "A"}
              <span className={clsx("margin-left--sm", styles.role)}>
                <DistortionString
                  contents={["iOS Developer", "Web Frontend Developer", "UX Designer"]}
                  setIsAn={setIsAn}
                />
              </span>
            </div>
            <div>
              <button className="button button--primary button--lg">
                RÉSUMÉ
              </button>
              <button className="button button--link button--lg color-primary-lightest">
                PORTFOLIO
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col col--4">
              <Card header="header" body="body" footer="footer" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

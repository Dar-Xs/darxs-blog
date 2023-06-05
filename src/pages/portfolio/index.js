import React from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import DistortionString from '../../components/DistortionString';

import styles from './index.module.scss';

function AnimatedStringSwitcher({contents}) {
  return <>

  </>
}

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

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
  // const [isAn, setIsAn] = useState(false);

  return (
    <Layout>
      <div>
        <div className={clsx("hero hero--dark", styles.banner)}>
          <div className="container">
            <h1 className={clsx("hero__title", styles.title)}>
              <span>Hello<span className={styles.wave}>👋</span>, 我叫</span>
              <strong>熊</strong>若晗
            </h1>
            <div className={styles.roleContent}>
              我是
              <span className={clsx("margin-left--sm", styles.role)}>
                <DistortionString
                  contents={["iOS 开发工程师", "Web 前端工程师", "UX 设计师"]}
                />
              </span>
            </div>
            <div>
              <button className="button button--primary button--lg">
                简历
              </button>
              <button className="button button--link button--lg color-primary-lightest">
                作品集
              </button>
            </div>
          </div>
          <div style={{width: "120px", height: "100px", backgroundColor: "grey"}}></div>
        </div>

        <div className="container" >
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

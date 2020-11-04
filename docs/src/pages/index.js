/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "Automatically run audits multiple times a day",
    imageUrl: "img/analysis.svg",
    description: (
      <>
        Falco runs performance audits several times a day, and offers a
        historical overview to monitor its evolution.
      </>
    ),
  },
  {
    title: "Monitor key performance metrics",
    imageUrl: "img/monitoring.svg",
    description: (
      <>
        Falco monitors key performance metrics, and lets you choose which one
        you want to monitor—Time to Interactive, First Meaningful Paint, Speed
        Index…
      </>
    ),
  },
  {
    title: "Invite and involve your whole team",
    imageUrl: "img/team.svg",
    description: (
      <>
        Invite your team to Falco to make collaboration around performance
        issues better, with fine-grained user rights management.
      </>
    ),
  },
  {
    title: "Audit individual URLs or entire user journeys",
    imageUrl: "img/user_journey.svg",
    description: (
      <>
        You can both test the performance of individual, public URLs or complete
        user journeys—it even works for Single Page Apps!
      </>
    ),
  },
  {
    title: "View and compare WebPageTest results",
    imageUrl: "img/compare.svg",
    description: (
      <>
        Compare side-by-side the WebPageTest results of your app before and
        after a specific release to see its impact on performance.
      </>
    ),
  },
  {
    title: "Use your own WebPageTest Private Instance",
    imageUrl: "img/private.svg",
    description: (
      <>
        You can choose to use your own WebPageTest Private Instance for more
        frequent audits, or rely on the public one.
      </>
    ),
  },
];

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Falco · Open Source WebPageTest runner`}
      description="Falco · Open Source WebPageTest runner"
    >
      <header className={classnames("hero", styles.heroBanner)}>
        <div className="container">
          <div className="row">
            <div className={classnames("col col--6", styles.heroSection)}>
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div className={classnames("button-group", styles.buttons)}>
                <Link
                  className={classnames(
                    "button button--outline button--secondary button--lg",
                    styles.addFocus
                  )}
                  to={useBaseUrl("docs/getting-started/installation")}
                >
                  Read the docs
                </Link>
                <Link
                  className={classnames(
                    "button button--primary button--lg",
                    styles.addFocus
                  )}
                  href="https://heroku.com/deploy?template=https://github.com/theodo/falco/tree/1.1.5"
                  target="_blank"
                >
                  Deploy to Heroku
                </Link>
              </div>
            </div>
            <div
              className={classnames("col col--6", styles.heroSection)}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={useBaseUrl("img/screenshot.jpg")}
                alt="A screenshot of the Falco project view"
                className="shadow--md"
                style={{ maxWidth: "500px", alignSelf: "center" }}
              />
            </div>
          </div>
          <div className={classnames("text--center", styles.infoPill)}>
            <p>
              Looking for Theodo’s Falco instance? Head to its new URL:{" "}
              <a href="https://falco.theo.do">https://falco.theo.do</a>.
            </p>
            <p>
              To see a demo, log in to{" "}
              <a href="https://falco.theo.do">https://falco.theo.do</a> with the
              credentials <code>demo / demodemo</code>.
            </p>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.users}>
          <div className="container">
            <div className="text--center">
              <h2>Trusted By</h2>
            </div>
            <div className={classnames("row", styles.usersImages)}>
              <div
                className="col col--2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <img
                  src={useBaseUrl("img/bnp.png")}
                  alt="BNPParibas Asset Management logo"
                />
              </div>
              <div
                className="col col--2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <img
                  src={useBaseUrl("img/choose.png")}
                  alt="Choose my Company logo"
                />
              </div>
              <div
                className="col col--2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <img src={useBaseUrl("img/tarkett.png")} alt="Tarkett logo" />
              </div>
              <div
                className="col col--2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <img src={useBaseUrl("img/voodoo.png")} alt="Voodoo logo" />
              </div>
              <div
                className="col col--2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <img src={useBaseUrl("img/evaneos.png")} alt="Evaneos logo" />
              </div>
              <div
                className="col col--2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <img src={useBaseUrl("img/oscaro.png")} alt="Oscaro logo" />
              </div>
            </div>
          </div>
        </section>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ imageUrl, title, description }, idx) => (
                  <div
                    key={idx}
                    className={classnames("col col--4", styles.feature)}
                  >
                    {imageUrl && (
                      <div className="text--center">
                        <img
                          className={styles.featureImage}
                          src={useBaseUrl(imageUrl)}
                          alt=""
                        />
                      </div>
                    )}
                    <h2>{title}</h2>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;

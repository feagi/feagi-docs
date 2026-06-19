import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

// siteUrl is baked in at build time via FEAGI_DOCS_URL.
// Cross-site links (outside /docs/ baseUrl) must use absolute URLs because
// Docusaurus prepends baseUrl to any href that starts with "/".
declare const process: { env: { FEAGI_DOCS_URL?: string } };

type JourneyCardProps = {
  title: string;
  audience: string;
  description: string;
  link: string;
  linkLabel: string;
};

function JourneyCard({ title, audience, description, link, linkLabel }: JourneyCardProps): ReactNode {
  return (
    <div className={styles.card}>
      <div className={styles.cardAudience}>{audience}</div>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
      <Link className="button button--primary button--sm" to={link}>
        {linkLabel}
      </Link>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = (siteConfig.customFields?.siteRoot as string) ?? "https://brainsforrobots.com";

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className="container">
          <Heading as="h1">FEAGI Documentation</Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            <JourneyCard
              title="Brain Builder"
              audience="Researchers, roboticists, AI practitioners"
              description="Design, configure, and train FEAGI brains. Connect them to physical robots or simulators. Use the Brain Visualizer and Neurorobotics Studio."
              link="/brain-builder"
              linkLabel="Start building"
            />
            <JourneyCard
              title="SDK & Integrations"
              audience="Robotics engineers, simulator developers, hardware hackers"
              description="Connect your hardware or simulator to a running FEAGI instance using the Python, Rust, or Java SDK — or the REST API and MCP server."
              link="/sdk"
              linkLabel="Start integrating"
            />
            <JourneyCard
              title="Contributing"
              audience="Rust engineers, neuroscience-informed developers"
              description="Understand feagi-core internals: the NPU, genome pipeline, morphogenetic connectivity, and HAL. Learn how to extend and contribute."
              link="/contributing"
              linkLabel="Explore internals"
            />
          </div>

          <div className={styles.apiCallout}>
            <strong>REST API Reference</strong> — interactive viewer and full OpenAPI 3.0 spec.{" "}
            <a href={`${siteUrl}/feagi/api-docs`}>Open API reference</a>
          </div>
        </div>
      </main>
    </Layout>
  );
}

/**
 * OmniFexa — Centralized site configuration.
 *
 * This file contains public-facing identity and configuration values only.
 * Never place secrets, API keys, or credentials here.
 */

export const siteConfig = {
  /** Product name */
  name: "OmniFexa",

  /** Primary tagline */
  tagline: "Every Tool. One Workspace.",

  /** SEO / meta description */
  description:
    "Free online tools for PDF, images, screenshots, documents, OCR, text, developers and more — built for mobile and desktop.",

  /** Local development URL */
  url: {
    development: "http://localhost:3000",
    /** Production URL — to be set when domain is configured */
    production: "https://omnifexa.com",
  },

  /** Contact — placeholder, update when real address is ready */
  supportEmail: "support@omnifexa.com",

  /** Internationalisation */
  locales: {
    supported: ["en"] as const,
    default: "en" as const,
  },
} as const;

export type SiteConfig = typeof siteConfig;

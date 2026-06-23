import { useEffect } from "react";
import { artist } from "@/data/artist";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

export default function SEO({ title, description, image, path }: SEOProps) {
  const fullTitle = title ? `${title} — ${artist.stageName}` : `${artist.stageName} — ${artist.tagline}`;
  const desc = description ?? artist.shortBio;
  const img = image ?? artist.heroImage;
  const url = path ? `${window.location.origin}${path}` : window.location.href;

  useEffect(() => {
    document.title = fullTitle;
    setMeta("description", desc);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", desc, true);
    setMeta("og:image", img, true);
    setMeta("og:url", url, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", `${artist.stageName} Official`, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", img);
    setMeta("theme-color", "#050507");
  }, [fullTitle, desc, img, url]);

  return null;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

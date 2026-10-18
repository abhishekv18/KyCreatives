import { useEffect } from "react";

const SITE = "KY Creatives";

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, name] = selector.match(/\[(name|property)="([^"]+)"\]/);
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Page meta for a service page, from its entry in data/services. */
export function useServiceMeta(service) {
  usePageMeta({ title: service.meta.title, description: service.meta.description });
}

/** Sets the document title, description and basic social tags for a route. */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE}` : `${SITE} | Design-led software, web and mobile apps`;
    document.title = full;
    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }
    setMeta('meta[property="og:title"]', "content", full);
  }, [title, description]);
}

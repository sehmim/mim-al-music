import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Route changes keep the previous page's scroll offset, so every navigation
 * starts at the top instead. `instant` is explicit because the global
 * `scroll-behavior: smooth` would otherwise animate the jump — and an
 * interrupted animation can leave the new page part-way down.
 * Anchored links (/#releases) are left alone for the target page to handle.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;

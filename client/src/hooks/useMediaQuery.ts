import { useState, useEffect } from "react";

/**
 * Type-safe hook to detect media query matches.
 * @param query - The media query string (e.g., "(max-width: 1024px)")
 */
export function useMediaQuery(query: string): boolean {
  // Initialize state with the current match to avoid the redundant setMatches in useEffect
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false; // Default for SSR
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    // We define the listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Subscribe to changes
    media.addEventListener("change", listener);

    // Clean up
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

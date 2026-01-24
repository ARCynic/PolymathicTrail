import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" }); 
    // if "instant" feels weird in your browser, use: behavior: "auto"
  }, [pathname]);

  return null;
}
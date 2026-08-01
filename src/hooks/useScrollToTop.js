import {useLayoutEffect} from "react";

/**
 * Scrolls the document back to the top whenever `key` changes.
 *
 * The app swaps pages inside a single document (no router), so the browser keeps
 * the scroll offset across a page change - land on a new page scrolled halfway
 * down and its header is off-screen. Runs in a layout effect so the reset
 * happens before paint and the old offset is never visible.
 */
const useScrollToTop = (key) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);
};

export default useScrollToTop;

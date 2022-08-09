import { useEffect } from "react";

const ScrollToSection = (props: {map}) => {
  // const [section, setSection] = useState("#intro");
  let currentSection = "#intro";

  const indexOfSmallest = (a?) => {
    var lowest = 0;
    if(a)
      for (var i = 1; i < a.length; i++)
        if (a[i] < a[lowest]) lowest = i;
    return lowest;
  }

  const onScroll = () => {
    let els: number[] = [];
    let hrefs: string[] = [];
    for (const key in props?.map?.sections) {
      if (props?.map?.sections?.hasOwnProperty?.(key) && document?.getElementById?.(key)?.getBoundingClientRect?.()?.y) {
        els?.push?.(Math.abs(document?.getElementById?.(key)?.getBoundingClientRect?.()?.y || 0));
        hrefs?.push?.(props?.map?.sections?.[key]);
      }
    }
    let cEl = hrefs?.[indexOfSmallest(els)];
    if (currentSection !== cEl) {
      currentSection = (cEl);
      window?.history?.pushState?.("", "", "#" + currentSection);
    }
  }

  useEffect(() => {
    window?.addEventListener?.("scroll", onScroll);

    return () => {
      window?.removeEventListener?.("scroll", onScroll);
    }
  }, [/*section*/]);

  return null;
}

export default ScrollToSection;
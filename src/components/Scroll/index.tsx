import { useEffect } from "react";
import { default as map } from "../../pages/map.json";

const Scroll = () => {
  // const [section, setSection] = useState("#intro");
  let currentSection = "#intro";

  const indexOfSmallest = (a) => {
    var lowest = 0;
    for (var i = 1; i < a.length; i++) {
      if (a[i] < a[lowest]) lowest = i;
    }
    return lowest;
  }
  const onScroll = () => {
    let els: number[] = [];
    let hrefs: string[] = [];
    for (const key in map.sections) {
      if (map.sections.hasOwnProperty(key) && document.getElementById(key)?.getBoundingClientRect()?.y) {
        els.push(Math.abs(document?.getElementById(key)?.getBoundingClientRect()?.y || 0));
        hrefs.push(map.sections[key]);
      }
    }
    let cEl = hrefs[indexOfSmallest(els)];
    if (currentSection !== cEl) {
      currentSection = (cEl);
      window.history.pushState("", "", "#" + currentSection);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [/*section*/]);

  return null;
}

export default Scroll;
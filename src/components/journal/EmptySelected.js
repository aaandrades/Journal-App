import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import main from "../../assets/lottie/empty.json";

export const EmptySelected = () => {
  const refContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: refContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: main,
    });
  }, []);

  return (
    <div className="empty__main-content">
      <span className="auth__box-announcement__title">Select a note</span>
      <div ref={refContainer}></div>
      <span className="auth__box-announcement__title">
        or create a new one!
      </span>
    </div>
  );
};

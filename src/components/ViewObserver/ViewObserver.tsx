import React, { useEffect, useRef } from 'react';

const useViewObserver = (callback: () => void) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return observerTarget;
};

export const ViewObserver = ({ callback }: { callback: () => void }) => {
  const ref = useViewObserver(callback);
  return <div ref={ref} />;
};

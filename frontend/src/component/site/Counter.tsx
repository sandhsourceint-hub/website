import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) animate(mv, to, { duration, ease: "easeOut" });
  }, [inView, to, duration, mv]);

  useEffect(
    () =>
      rounded.on("change", (v) => {
        if (ref.current) ref.current.textContent = `${v}${suffix}`;
      }),
    [rounded, suffix],
  );

  return <span ref={ref}>0{suffix}</span>;
}

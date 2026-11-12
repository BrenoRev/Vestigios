import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { MotionConfig } from "motion/react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export function App() {
  return (
    // reducedMotion="user": o Motion respeita prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
      {/* Vercel Web Analytics (ADR-009): sem cookies; em dev só registra no console. */}
      <Analytics mode={import.meta.env.DEV ? "development" : "production"} />
      {/* Vercel Speed Insights (ADR-009): Core Web Vitals reais; em dev só registra no console. */}
      <SpeedInsights />
    </MotionConfig>
  );
}

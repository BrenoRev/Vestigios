import { Analytics } from "@vercel/analytics/react";
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
    </MotionConfig>
  );
}

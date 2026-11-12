import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { MotionConfig } from "motion/react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export function App() {
  return (
    // "user" faz o Motion seguir o prefers-reduced-motion do sistema.
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
      <Analytics mode={import.meta.env.DEV ? "development" : "production"} />
      <SpeedInsights />
    </MotionConfig>
  );
}

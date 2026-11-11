import { MotionConfig } from "motion/react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export function App() {
  return (
    // reducedMotion="user": o Motion respeita prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import ToastStack from "../components/admin/ToastStack";

/**
 * The working shell every signed-in screen lives inside — deliberately
 * calmer than the auth pages. The starfield/embers/mandala are a
 * once-a-day arrival moment; a screen someone works in for hours needs to
 * be legible and quiet, not cinematic. Brand continuity comes from the
 * palette/type/logo, not from re-running the animation.
 *
 * Below the `md` breakpoint the sidebar is an off-canvas drawer instead of
 * a permanent column — this is the one piece of state both Sidebar and
 * Topbar need to share (Topbar's hamburger opens it, Sidebar owns closing
 * it), so it lives here rather than in either component.
 */
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ivory-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="relative flex-1 overflow-y-auto overflow-x-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.05),transparent_70%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
      <ToastStack />
    </div>
  );
}
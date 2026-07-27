import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";

import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="never">
      <ErrorBoundary>
        <BrowserRouter>
          <div className="min-h-screen bg-[#05050b] text-white">
            <Navbar />
            <AnimatedRoutes />
          </div>
        </BrowserRouter>
      </ErrorBoundary>
    </MotionConfig>
  );
}

export default App;
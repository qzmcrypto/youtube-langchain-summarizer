import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import Summary from "./pages/Summary";

import Navbar from "./components/Navbar";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#05050b] text-white">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
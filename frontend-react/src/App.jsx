import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import Summary from "./pages/Summary";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
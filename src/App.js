import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import LandingPage from "./components/landing/LandingPage";

import "@fontsource/press-start-2p";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

function App() {
  // Use PUBLIC_URL from build time for proper subdirectory routing
  // process.env.PUBLIC_URL is set during build (e.g., "/" or "/feat-branch-name")
  const basename = process.env.PUBLIC_URL || "";

  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;

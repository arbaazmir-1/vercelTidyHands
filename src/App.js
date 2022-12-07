import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./ components/ScrollToTop";

import SplashPage from "./Screens/SplashPage";
import GetStartedPage from "./Screens/GetStartedPage";
import MainPage from "./Screens/MainPage";
import LoginPage from "./Screens/LoginPage";
import HelpersProfilePage from "./Screens/HelpersProfilePage";
import GigPage from "./Screens/GigPage";

function App() {
  return (
    <Router>
      <main className="p-3">
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/getstarted" element={<GetStartedPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/helperprofile" element={<HelpersProfilePage />} />
            <Route path="/gig/:id" element={<GigPage />} />
          </Routes>
        </ScrollToTop>
      </main>
    </Router>
  );
}

export default App;

import { useState } from "react";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Navbar from "./components/layout/Navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Vulnerabilities from "./pages/vulnerabilities/Vulnerabilities";
import RiskAnalysis from "./pages/risk/RiskAnalysis";
import Investment from "./pages/investment/Investment";
import AIRecommendations from "./pages/ai/AIRecommendations";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Vulnerabilities":
        return <Vulnerabilities />;
      case "Risk Analysis":
        return <RiskAnalysis />;
      case "Investment":
        return <Investment />;
      case "AI Recommendations":
        return <AIRecommendations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="main-area">
        <Navbar activePage={activePage} />
        <main className="content">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
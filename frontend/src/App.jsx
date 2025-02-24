import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TransactionStatus from "./pages/TransactionStatus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction/:orderId" element={<TransactionStatus />} />
      </Routes>
    </Router>
  );
}

export default App;

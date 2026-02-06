import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Merge from "./Page/Merge";
import Split from "./Page/Split";
import Compress from "./Page/Compress";
import ConvertPDF from "./Page/ConvertPDF";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/merge" element={<Merge />} />
        <Route path="/split" element={<Split />} />
        <Route path="/compress" element={<Compress />} />
        <Route path="/convert-pdf" element={<ConvertPDF />} />
        <Route path="/" element={<ConvertPDF />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

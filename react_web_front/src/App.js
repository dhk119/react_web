import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/Footer";
import Main from "./components/common/Main";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

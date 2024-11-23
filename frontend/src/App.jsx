import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/login" element={<LoginPage/>} />

    </Routes>
    <Footer/>
    </>
  )
}

export default App

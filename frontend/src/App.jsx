import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/404";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {

  const {user, isCheckingAuth, authCheck} = useAuthStore();
  console.log(user)

  useEffect(() => {
    authCheck();
  }, []);

	if (isCheckingAuth) { 
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={user?  <Navigate to={"/"} /> :<SignupPage/>} />
      <Route path="/login"element={user?  <Navigate to={"/"} /> :<LoginPage/>} />
      <Route path="/watch/:id"element={user? <WatchPage/> : <Navigate to={"/login"} /> } />
      <Route path="/search"element={user? <SearchPage/> : <Navigate to={"/login"} /> } />
      <Route path="/history"element={user? <SearchHistoryPage/> : <Navigate to={"/login"} /> } />
      <Route path="/*"element= {<NotFoundPage/>}/>





    </Routes>
    <Footer/>
    
    <Toaster/>
    </>
  )
}

export default App

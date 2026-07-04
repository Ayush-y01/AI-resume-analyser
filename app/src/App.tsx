import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Account from "./pages/Account"
import { useAppData } from "./context/AppContext"
import Loading from "./components/Loading"
import PublicRoutes from "./components/PublicRoutes"
import ProtectedRotes from "./components/ProtectedRoutes"
import AnalysePage from "./pages/Analyse"
import JobMatcherPage from "./pages/JobMatcher"
import InterviewPrep from "./pages/Interview"
import BuildResumePage from "./pages/BuildResume"


const App = () => {
  const {loading} = useAppData()

  if (loading) {
    return <Loading />
  }
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PublicRoutes />} >
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRotes />}>
          <Route path="/analyse" element={<AnalysePage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/jobmatcher" element={<JobMatcherPage />} />
          <Route path="/interviewprep" element={<InterviewPrep />} />
          <Route path="/resumebuilder" element={<BuildResumePage />} />

        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
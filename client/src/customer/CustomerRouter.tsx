import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"

const CustomerRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />}/>
    </Routes>
  )
}

export default CustomerRouter
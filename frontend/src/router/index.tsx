import { Route, Routes } from "react-router-dom"
import  Home  from "../pages/home"
import  Login  from "../pages/login"


export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
import { Route, Routes } from "react-router-dom"
import  Home  from "../pages/home"
import  Login  from "../pages/login"
import {Produtos} from "../pages/produtos"
import  Compras  from "../pages/compras"


export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="compras" element={<Compras />} />
        </Routes>
    )
}
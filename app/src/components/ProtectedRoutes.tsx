import { Navigate, Outlet } from "react-router-dom"
import { useAppData } from "../context/AppContext"


const ProtectedRotes = () => {
    const {isAuth, loading} = useAppData()

    if (loading) return null

    return isAuth ? <Navigate to={'/login'} replace /> : <Outlet />
}

export default ProtectedRotes
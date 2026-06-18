import { Navigate, Outlet } from "react-router-dom";
import { useAppData } from "../context/AppContext";

const ProtectedRotes = () => {
  const { isAuth, loading } = useAppData();

  if (loading) return null;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRotes;
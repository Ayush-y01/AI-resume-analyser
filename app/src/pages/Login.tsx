import { Link, useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { features } from "../utils";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuth } = useAppData();

  const handleGoogleLogin = async (authResult: any) => {
    setLoading(true);

    try {
      const result = await axios.post(`${server}/api/user/login`, {
        code: authResult["code"],
      });

      localStorage.setItem("token", result.data.token);
      

      setUser(result.data.user);
      setIsAuth(true);

      toast.success(result.data.message);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Problem while login");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    onError: (error) => {
      console.log(error);
      toast.error("Google Login Failed");
    },
    flow: "auth-code",
  });

  return (
    <div
      className="min-h-screen bg-[#080b14]
      flex items-center justify-center
      px-6 py-24"
    >
      <div
        className="w-full max-w-md
        bg-white/[0.03]
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-8 md:p-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-xl
            bg-gradient-to-br
            from-indigo-500 to-emerald-400
            flex items-center justify-center
            text-2xl shadow-lg shadow-indigo-500/30"
          >
            📚
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Welcome Back
          </h1>

          <p className="text-white/50 mt-2">
            Sign in to continue your career journey
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 my-8">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2
              px-4 py-2 rounded-full
              bg-white/5 border border-white/10
              text-white/70 text-sm
              hover:bg-white/10
              transition-all duration-300"
            >
              <Icon
                size={16}
                className="text-indigo-400 flex-shrink-0"
              />

              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="h-px bg-white/10"></div>

          <span
            className="absolute left-1/2 -translate-x-1/2
            -top-3 px-3 bg-[#080b14]
            text-white/40 text-sm"
          >
            QUICK LOGIN
          </span>
        </div>

        {/* Google Login */}
        <button
          onClick={() => googleLogin()}
          disabled={loading}
          className="w-full py-3 rounded-xl
          border border-white/10
          bg-white/5
          hover:bg-white/10
          transition-all duration-300
          text-white flex items-center justify-center gap-3
          disabled:opacity-50
          disabled:cursor-not-allowed"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />

          {loading ? "Signing In..." : "Continue with Google"}
        </button>

        {/* Footer Text */}
        <p className="text-center text-white/50 mt-8 text-sm">
          By continuing you agree to our{" "}
          <Link
            to="/terms"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
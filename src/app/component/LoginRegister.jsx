import { useState } from "react";
import { ArrowLeft, Mail, User, EyeOff, Eye, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginRegister = ({ onBackHome }) => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 404) {
        alert("User not found. Please register first.");
        setActiveTab("register");
      } else {
        alert("Invalid email or password");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !registerEmail || !registerPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const registerData = {
      full_Name: username,
      email: registerEmail,
      password: registerPassword,
      role_Id: 3, // Default User
    };

    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, registerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Registration Successful. Please login.");
      setActiveTab("login");

      setUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration Failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        {/* back to home page button  */}
        <button
          onClick={() => navigate(-1)} // OR navigate("/")
          className="absolute top-6 left-6 flex items-center gap-2
                   text-primaryText hover:text-brandBlue transition font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>
        *{/* ===== Heading (ABOVE card) ===== */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-primaryText p-2 rounded-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-primaryText">
            BugAnalyzer AI
          </h1>
        </div>
        {/* card  */}
        <div
          className={`w-[396px]  bg-white shadow-2xl border-primaryText rounded-xl overflow-hidden
                        transition-all duration-300 ${
                          activeTab === "register"
                            ? "max-h-[620px]"
                            : "max-h-[460px]"
                        }`}
        >
          {/* login heading */}
          <div className="flex h-[72px] border-b border-[#373737]">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 text-lg font-semibold relative transition
                              ${
                                activeTab === "login"
                                  ? "text-primaryText after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gray-400"
                                  : "text-gray-400"
                              }`}
            >
              Login
            </button>
            {/* register heading */}
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 text-lg font-semibold relative transition
                                 ${
                                   activeTab === "register"
                                     ? "text-primaryText after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gray-400"
                                     : "text-gray-400"
                                 }`}
            >
              Register
            </button>
          </div>

          {/* form start */}
          <div className="relative overflow-hidden">
            <div
              className={`flex transition-transform duration-300 ${
                activeTab === "register" ? "-translate-x-full" : "translate-x-0"
              }`}
            >
              {/* login form */}
              <form
                onSubmit={handleLogin}
                className="w-full shrink-0 p-8 flex flex-col gap-5 "
              >
                {/* email */}
                <input
                  type="email"
                  icon={<Mail size={16} />}
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  // className="w-full mb-3 p-3 border rounded"
                  className="
                                        bg-transparent
                                        border-0
                                        border-b
                                        border-gray-500
                                        focus:border-brandBlue
                                        focus:ring-0
                                        text-primaryText
                                        placeholder-gray-400
                                        py-2
                                        outline-none
                                    "
                />

                {/* password */}
                <div className="flex items-center gap-3 border-b border-gray-500 focus-within:border-brandBlue transition">
                  {/* <Lock size={18} className="text-gray-400" /> */}
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="w-full bg-transparent text-primaryText placeholder-gray-400 py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-400 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* button */}
                <button
                  // onClick={() => navigate("/dashboard")}
                  className="bg-brandBlue hover:bg-blue-950 transition rounded-lg py-3 text-white font-semibold"
                >
                  Login
                </button>

                {/* continue as guest */}
                {/* <button
                                    type="button"
                                    className="text-sm text-brandBlue hover:underline text-center"
                                >
                                    Continue as Guest
                                </button> */}
              </form>

              {/* register form */}
              <form
                onSubmit={handleRegister}
                className="w-full shrink-0 p-8 flex flex-col gap-5"
              >
                {/* username */}
                <input
                  type="text"
                  icon={<User size={16} />}
                  placeholder="UserName"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="
                                        bg-transparent
                                        border-0
                                        border-b
                                        border-gray-500
                                        focus:border-brandBlue
                                        focus:ring-0
                                        text-primaryText
                                        placeholder-gray-400
                                        py-2
                                        outline-none
                                    "
                />

                {/* email */}
                <input
                  type="email"
                  icon={<Mail size={16} />}
                  placeholder="Email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="
                                        bg-transparent
                                        border-0
                                        border-b
                                        border-gray-500
                                        focus:border-brandBlue
                                        focus:ring-0
                                        text-primaryText
                                        placeholder-gray-400
                                        py-2
                                        outline-none
                                    "
                />

                {/* password */}
                <div className="flex items-center gap-3 border-b border-gray-500 focus-within:border-brandBlue transition">
                  {/* <Lock size={18} className="text-gray-400" /> */}
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={registerPassword}
                    required
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full bg-transparent text-primaryText placeholder-gray-400 py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-400 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* confirm password */}
                <div className="flex items-center gap-3 border-b border-gray-500 focus-within:border-brandBlue transition">
                  {/* <Lock size={18} className="text-gray-400" /> */}
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent text-primaryText placeholder-gray-400 py-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-400 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {/* button */}
                <button
                  type="submit"
                  className="bg-brandBlue hover:bg-blue-950 transition rounded-lg py-3 text-white font-semibold"
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;

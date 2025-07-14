import { useState } from "react";
import loginImg from "../../assets/images/login.png";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useLoginMutation } from "../../Api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import toast from "react-hot-toast";

const SignIn = () => {
  const credentials = useSelector((state) => state.auth);
  console.log(credentials);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    try {
      const res = await login(data).unwrap();

      const { access, refresh } = res;
      // Dispatch userLoggedIn to update Redux state
      dispatch(
        setCredentials({
          access: access,
          refresh: refresh,
        })
      );
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      return;
    }
    setEmail("");
    setPassword("");
    console.log("Login successful, redirecting...");
    navigate("/"); // Redirect to home page after login
  };

  return (
    <div className="min-h-screen flex font-outfit">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex w-5/12">
        <div className="relative h-screen w-full">
          <img
            src={loginImg}
            alt="Kevin Orellana Fitness"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark bg-opacity-70"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h1 className="uppercase text-4xl font-inter  tracking-[0.3em] leading-loose">
              <span className="text-5xl">K</span>
              <span className="">evin </span>
              <span className="text-5xl">O</span>
              <span className="">rellana</span>
            </h1>

            <p className="text-lg tracking-widest">HEALTH & FITNESS APP</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-1 items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Login</h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-black" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:z-10"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-black" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:z-10 pr-10"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-black" />
                    ) : (
                      <Eye className="h-5 w-5 text-black" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-neutral focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

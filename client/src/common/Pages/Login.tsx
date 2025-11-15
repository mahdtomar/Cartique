import Logo from "@/features/customer/components/misc/Logo";
import { useContext, useState } from "react"
import Request from "../api/axios";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "@/features/customer/components/misc/Navbar";
import axios from "axios";
type loginErrors = {
  email?: string;
  password?: string
}
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<loginErrors>({})
  const navigate = useNavigate()
  const fetchUser = useContext(UserContext)?.fetchUser
  const redirect = () => {
    const redirectPage = sessionStorage.getItem("redirectPage");
    sessionStorage.removeItem('redirectPage')
    return redirectPage ? navigate(JSON.parse(redirectPage)) : navigate("../");
  }
  const validation = () => {
    const newErrors: loginErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }
    console.log('validation : ', newErrors)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validation()) {
      return
    }
    try {
      const res = await Request(
        "/auth/login",
        "POST",
        true,
        undefined,
        undefined,
        { email, password }
      );
      console.log(res);

      redirect();
      fetchUser?.(true);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setErrors({ ...errors, email: err.response.data.message });
        } else if (err.response?.status === 400) {
          setErrors({ ...errors, password: err.response.data.message });
        }
      } else {
        console.log("Unknown error", err);
      }
    }
  }
  return (
    <>
      <Navbar />
      <div className="container flex flex-col justify-center items-center min-h-screen ">
        <form onSubmit={submit}>
          <div className="card shadow-xl w-[90%] min-w-[400px] p-2 flex flex-col gap-4 rounded" >
            <div className="text-center">
              <Logo />
            </div>
            <label htmlFor="email" className="flex flex-col justify-start">
              <span className="font-bold">Email</span>
              <input className={`block w-full px-3 py-2 border ${errors?.email
                ? "border-red-500"
                : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`} type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" />
              {errors?.email && <span className="text-red-500 ">{errors.email}</span>}
            </label>
            <label htmlFor="password" className="flex flex-col justify-start">
              <span className="font-bold">Password</span>
              <input className={`block w-full px-3 py-2 border ${errors?.password
                ? "border-red-500"
                : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`} type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
              {errors?.password && <span className="text-red-500 ">{errors.password}</span>}
            </label>
            <button className="primary w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </>

  )
}

export default Login
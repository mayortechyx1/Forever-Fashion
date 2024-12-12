import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../layouts/MainLayout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Login") {
        const res = await axios.post(
          backendUrl + "/api/auth/login",
          { email, password },
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setUser("user logged in");
          toast.success("user logged in");
        }
      } else {
        if (password !== password2) {
          toast.error("passwords do not match");
          return;
        }
        const res = await axios.post(
          backendUrl + "/api/auth/register",
          { name, email, password },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setUser("Registered User successfully");
        }
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
      setUser("");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl font-medium">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState !== "Login" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {currentState !== "Login" && (
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
      )}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="transform hover:scale-105 rounded-md bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Auth;

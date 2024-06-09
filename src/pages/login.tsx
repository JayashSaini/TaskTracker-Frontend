// Importing necessary components and hooks
import { useState } from "react";
import Button from "../components/Button.js";
import Input from "../components/Input";
import { useAuth } from "../context/auth.context.js";

// Component for the Login page
const Login = () => {
  // State to manage input data (username and password)
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // Accessing the login function from the AuthContext
  const { login } = useAuth();

  // Function to update state when input data changes
  const handleDataChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [name]: e.target.value,
      });
    };

  // Function to handle the login process
  const handleLogin = async () => await login(data);

  return (
    <div className="flex justify-center items-center flex-col p-4 sm:h-screen h-[90vh] w-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleLogin();
        }}
        className="sm:w-1/2 w-full sm:p-8 p-4 flex justify-center items-center gap-5 flex-col bg-[#1a2639] shadow-md rounded-2xl my-16 border-secondary border-[1px]"
      >
        <h1 className="text-2xl m-4 ">Login</h1>
        {/* Input for entering the username */}
        <Input
          placeholder="Enter the username..."
          value={data.username}
          onChange={handleDataChange("username")}
          required={true}
        />
        {/* Input for entering the password */}
        <Input
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={handleDataChange("password")}
          required={true}
        />
        {/* Button to initiate the login process */}
        <Button fullWidth>Login</Button>
        {/* Link to the registration page */}
        <small className="text-zinc-300">
          Don&apos;t have an account?{" "}
          <a className="text-blue-400 hover:underline" href="/register">
            Register
          </a>
        </small>
      </form>
    </div>
  );
};

export default Login;

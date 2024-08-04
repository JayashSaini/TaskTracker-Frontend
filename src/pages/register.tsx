// Import necessary components and hooks
import { useState } from "react";
import Button from "../components/Button.js";
import Input from "../components/Input";
import { useAuth } from "../context/auth.context.js";

// Component for user registration
const Register = () => {
  // State to manage user registration data
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // Access the register function from the authentication context
  const { register } = useAuth();

  // Handle data change for input fields
  const handleDataChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update the corresponding field in the data state
      setData({
        ...data,
        [name]: e.target.value,
      });
    };

  // Handle user registration
  const handleRegister = async () => await register(data);

  return (
    // Register form UI
    <div className="flex justify-center items-center flex-col p-4 sm:h-screen h-[90vh] w-screen">
      <form
        onSubmit={handleRegister}
        className="sm:w-1/2 w-full sm:p-8 p-4 flex justify-center items-center gap-5 flex-col bg-[#1a2639] shadow-md rounded-2xl my-16 border-gray-200 border-[1px]"
      >
        <h1 className="text-2xl m-4 text-white ">Sign up</h1>
        {/* Input fields for username, password, and email */}
        <Input
          placeholder="Enter the email..."
          type="email"
          value={data.email}
          onChange={handleDataChange("email")}
          required={true}
        />
        <Input
          placeholder="Enter the username..."
          value={data.username}
          onChange={handleDataChange("username")}
          required={true}
        />
        <Input
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={handleDataChange("password")}
          required={true}
        />
        {/* Register button */}
        <Button fullWidth>Sign up</Button>
        {/* Login link */}
        <small className="text-zinc-300">
          Already have an account?{" "}
          <a className="text-blue-400 hover:underline" href="/login">
            Login
          </a>
        </small>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import Input from "../components/Input";
import clsx from "clsx";

const Auth = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [login, setLogin] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-center bg-white rounded-lg p-5 shadow-md">
      <div className="h-max w-84 flex flex-col gap-5 justify-center items-center">
        {!login ? (
          <Input
            darkMode={false}
            placeholder="John Doe"
            input={name}
            setInput={setName}
            label="Enter your Name"
            type="text"
            size="sm"
          />
        ) : (
          <div></div>
        )}
        <Input
          darkMode={false}
          placeholder="johndoe@gmail.com"
          input={email}
          setInput={setEmail}
          label="Enter your email"
          type="text"
          size="sm"
        />
        <Input
          darkMode={false}
          placeholder="johndoe@gmail.com"
          input={password}
          setInput={setPassword}
          label="Enter your password"
          type="text"
          size="sm"
        />
        {!login ? (
          <Input
            darkMode={false}
            placeholder="johndoe@gmail.com"
            input={confirmPassword}
            setInput={setConfirmPassword}
            label="Reconfirm your password"
            type="text"
            size="sm"
          />
        ) : (
          <div></div>
        )}

        <p
          className={clsx(
            "text-xs tracking-wide transition-colors duration-300",
          )}
        >
          {login ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setLogin(!login)}
            className={clsx(
              "font-bold transition-all duration-300 hover:underline underline-offset-4 cursor-pointer text-indigo-600 hover:text-orange-500",
            )}
          >
            {login ? "Sign Up" : "Sign In"}
          </button>
        </p>
        <button className="w-[calc(100%-2rem)] bg-orange-500 text-white font-semibold p-1.5 rounded-lg">
          {login ? "Sign In " : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;

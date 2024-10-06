import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../config";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    name: "",
    username: "",
    password: ""
  });

  async function sendRequest() {
    try {
      const data = {
        email: postInputs.username, // Ensure this has a value
        password: postInputs.password, // Ensure this has a value
      };
  
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        data, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': JSON.stringify(data).length.toString(), // Set content length
          },
        }
      );
  
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.error(e); // Log error for debugging
    }
  }
  
  

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-4 py-4">
            <div className="text-3xl font-extrabold text-left mt-1">
              Create an account
            </div>
            <div className="text-slate-400 mt-2">
              {type === "signin"? "Don't have an account?":"Already have an account?"}
              <Link className="underline pl-2" to={type === "signin" ? "/signup": "/signin"}>
                {type === "signin" ? "Sign Up": "Sign In"}
              </Link>
            </div>
          </div>

          <div className="mt-3 ">
            {type === "signup" ?
            

            <LabelInput
              label ="Name"
              placeholder="Rohan Mishra"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value
                });
              }}
            /> : null }
            <LabelInput
              label="Username"
              placeholder="rohanmishra@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value
                });
              }}
            />

            <LabelInput
              label="Password"
              type="password"
              placeholder="1234..."
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value
                });
              }}
            />
            <button onClick={sendRequest} type="button" className=" mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelInputType {
  label: string;
  type?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div className="mb-4 font-medium ">
      <label className="mb-2 text-sm text-black font-bold ">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

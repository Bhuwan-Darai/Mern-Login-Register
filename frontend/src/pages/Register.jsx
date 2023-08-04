import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();
  const registerUser = async (e) => {
    e.preventDefault();
    //destructure the fields of data
    const { name, email, password } = data;

    try {
      const { data } = await axios.post("/register", { email, name, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        //set the field empty with the empyt object
        setData({});
        toast.success("Login successful ! Welcome");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;

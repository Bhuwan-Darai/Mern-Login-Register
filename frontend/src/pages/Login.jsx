import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });

      //if data contains errror display toast error
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/dashboard");
      }

      //after data is valid navigate to home page
      //donot use inside else
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={loginUser}>
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

export default Login;

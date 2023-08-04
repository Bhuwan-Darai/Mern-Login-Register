import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { token, setToken } = useState(token.value);
  const handleLogout = async () => {
    try {
      //make a post request to the backend
      axios.post("/logout", (token) => {
        setToken(token);
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && <h2>Hi {user.name}</h2>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

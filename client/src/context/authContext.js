import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/v1/users/login", inputs);
    console.log(res);

    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    console.log(currentUser.id);
    console.log(toString(currentUser.id));
    await axios
      .post("http://localhost:3000/v1/users/logout", {
        id: currentUser.id.toString(),
      })
      .then(function (response) {
        setCurrentUser(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
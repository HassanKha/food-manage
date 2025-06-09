import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


export let AuthContext = createContext(null);


export default function AuthContextProvider({ children }) {

 const getInitialLoggedData = () => {
    try {
      const token = localStorage.getItem("token");
      return token ? jwtDecode(token) : null;
    } catch (err) {
      return null;
    }
  };
  const [LoggedData, setLoggedData] = useState(getInitialLoggedData);

  const SaveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    encodedToken = jwtDecode(encodedToken);
    setLoggedData(encodedToken);
  };

  useEffect(() => {
    if (!LoggedData) {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken,'f');
          setLoggedData(decodedToken);
        } catch (error) {
          console.error("Invalid token:", error.message);
          localStorage.removeItem("token"); // Clean up
        }
      }
    }
  }, []);

return (
    <AuthContext.Provider value={{LoggedData,SaveLoginData}}>
      {children}
    </AuthContext.Provider>
  );
}
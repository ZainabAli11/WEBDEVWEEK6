import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-hot-toast";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [cars, setCars] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      const { data } = await axios.get("/api/user/data");
      if (data.success && data.user) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        setUser(null);
        setIsOwner(false);
        toast.error("User fetch failed");
        navigate("/");
      }
    } catch (error) {
      setUser(null);
      setIsOwner(false);
      toast.error(error.response?.data?.message || "Failed to fetch user");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
      }
    } finally {
      setLoadingUser(false);
    }
  };

  const login = async (email, password, role = "user") => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setToken(data.token);
        await fetchUser();
        toast.success("Login successful");
        if (role === "owner") {
          navigate("/owner/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login error");
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post("/api/auth/register", { name, email, password });
      if (data.success) {
        toast.success("Account created.");
        setShowLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    setIsOwner(false);
    toast.success("Logged out");
    navigate("/");
  };

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
      fetchUser();
    } else {
      setLoadingUser(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isOwner,
        cars,
        logout,
        showLogin,
        setShowLogin,
        loadingUser,
        fetchUser,
        loginUser: (email, password) => login(email, password, "user"),
        signupUser: (name, email, password) => register(name, email, password),

        loginOwner: () => {
          setUser({ name: "Owner", email: "owner@example.com", role: "owner" });
          setIsOwner(true);
          toast.success("Owner login successful");
          navigate("/owner/dashboard");
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppProvider;

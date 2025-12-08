import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  baseurl,
  getRequest,
  postRequest,
  putRequest,
} from "../utils/services";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { loginASUser } from "../APIServices";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    address: "",
    dob: "",
    confirmPassword: "",
    profileDp: "",
    caste: "",
    height: "",
    weight: "",
    qualification: "",
    siblings: "",
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    job: "",
    salary: "",
    religion: "",
    cigOrAlcohol: "",
  });

  const navigate = useNavigate();

  const formDataLength = Object.keys(formData).length;

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken && storedToken.split(".").length === 3) {
        try {
          const decodedUser = jwtDecode(storedToken);

          // Optional: Check for token expiry
          if (decodedUser.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            setUser(null);
          } else {
            await getUser(decodedUser);
          }
        } catch (error) {
          console.error("Token decode error:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
      setIsInitializing(false);
    }

    initAuth();
  }, []);

  const getUser = async (token) => {
    const response = await getRequest(`${baseurl}/users/${token.id}`);
    if (response.error) {
      setError(response.message);
    } else {
      setUser(response);
    }
  };

  const updateFormData = useCallback((info) => {
    setFormData(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setRegisterError(null);

      if (!formData) {
        setError("Please fill all fields");
        setIsLoading(false);
        return;
      }

      const response = await postRequest(
        `${baseurl}/users/register`,
        JSON.stringify(formData)
      );

      setIsLoading(false);

      if (response.error) {
        setRegisterError(response.message);
        toast.error(response.message);
      } else {
        localStorage.setItem("token", response.token);
        const decodedUser = jwtDecode(response.token);
        await getUser(decodedUser);
        toast.success("Registration successful");
        navigate("/profile");
      }
    },
    [formData]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setLoginError(null);

      if (!formData) {
        setError("Please fill all fields");
        setIsLoading(false);
        return;
      }

      try {
        const response = await loginASUser(formData.email, formData.password);

        if (response.error) {
          setLoginError(response.message);
          toast.error(response.message);
        } else {
          localStorage.setItem("token", response.token);
          const decodedUser = jwtDecode(response.token);
          await getUser(decodedUser);
          toast.success("Successfully logged in");
          navigate("/profile");
        }
      } catch (err) {
        setLoginError("Something went wrong. Please try again.");
        toast.error("Login failed.");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, navigate]
  );

  const updateUserProfile = useCallback(
    async (e, id) => {
      e.preventDefault();
      const response = await putRequest(
        `${baseurl}/users/${id}`,
        JSON.stringify(formData)
      );

      if (!response.error) {
        toast.success("Successfully updated!");
        localStorage.setItem("token", response.token);
        const decodedUser = jwtDecode(response.token);
        await getUser(decodedUser);
        navigate("/profile");
      } else {
        toast.error(response.message || "Update failed");
      }
    },
    [formData]
  );

  const logoutUser = () => {
    localStorage.removeItem("token");
    toast("You are logged out.");
    setUser(null);
    navigate("/");
  };

  const requestOTP = async (email) => {
    try {
      const response = await axios.post(`${baseurl}/users/request-reset`, {
        email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email, otp, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseurl}/users/reset-password`, {
        email,
        otp,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = useMemo(() => ({
    user,
    formData,
    setFormData,
    formDataLength,
    isLoading,
    isInitializing,
    updateFormData,
    error,
    setError,
    loginError,
    registerError,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    requestOTP,
    resetPassword,
  }), [
    user,
    formData,
    formDataLength,
    isLoading,
    isInitializing,
    error,
    loginError,
    registerError,
    updateFormData,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    requestOTP,
    resetPassword,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
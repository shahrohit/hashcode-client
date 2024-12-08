"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "@/utils/constants";
import Loading from "@/components/Loading";
import { AuthUser } from "@/types/response-type";

// Define the context type
interface AuthContextType {
  user: AuthUser | null;
  setUser: (token: AuthUser | null) => void;
  api: AxiosInstance;
  fetchUser: () => Promise<AuthUser | null>;
}

// Create the Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  // Function to fetch a new access token
  const fetchUser = async (): Promise<AuthUser | null> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      setUser(response.data.data as AuthUser);
      return response.data.data as AuthUser;
    } catch {
      setUser(null); // Clear access token if refresh fails
      return null;
    } finally {
      setIsPending(false);
    }
  };

  // Create Axios instance with global configurations
  const api = axios.create({
    baseURL: BASE_URL, // Replace with your actual base URL
    withCredentials: true, // Include credentials (cookies) with requests
  });

  // Add request interceptor
  api.interceptors.request.use(
    (config) => {
      if (user) {
        config.headers["Authorization"] = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true; // Prevent endless retry loop
        const newUser = await fetchUser();
        if (newUser) {
          error.config.headers[
            "Authorization"
          ] = `Bearer ${newUser.accessToken}`;
          return api.request(error.config); // Retry original request
        }
      }
      return Promise.reject(error);
    }
  );

  if (isPending) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, setUser, api, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

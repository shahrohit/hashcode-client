"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "@/utils/constants";
import Loading from "@/components/Loading";
import { AuthUser } from "@/types/response-type";

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  api: AxiosInstance;
  fetchUser: () => Promise<AuthUser | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isPending, setIsPending] = useState(true);
  const hasFetchedUser = useRef(false); // To prevent multiple calls

  const fetchUser = async (): Promise<AuthUser | null> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      setUser(response.data.data as AuthUser);
      return response.data.data as AuthUser;
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
      return null;
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedUser.current) {
      hasFetchedUser.current = true;
      fetchUser();
    }
  }, []);

  const api = useMemo(() => {
    const instance = axios.create({ baseURL: BASE_URL, withCredentials: true });

    instance.interceptors.request.use(
      (config) => {
        if (user)
          config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;
          const newUser = await fetchUser();
          if (newUser) {
            error.config.headers[
              "Authorization"
            ] = `Bearer ${newUser.accessToken}`;
            return instance.request(error.config);
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [user]);

  if (isPending) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, setUser, api, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

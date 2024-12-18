"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import Loading from "@/components/Loading";
import { AuthUser } from "@/types/response-type";
import { BACKEND_URL } from "@/config/config";
import { toast } from "sonner";

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
  const hasFetchedUser = useRef(false);

  const fetchUser = async (): Promise<AuthUser | null> => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );
      setUser(response.data.data as AuthUser);
      return response.data.data as AuthUser;
    } catch (error: any) {
      const err = error as AxiosError;
      if (err?.status === 429) {
        toast.error("Too many Request Please Try again later");
      }
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
    const instance = axios.create({
      baseURL: `${BACKEND_URL}/api`,
      withCredentials: true,
    });

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

  if (isPending)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loading />
      </main>
    );

  return (
    <AuthContext.Provider value={{ user, setUser, api, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

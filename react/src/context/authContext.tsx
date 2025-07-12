import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    authed: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [authed, setAuthed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
            setAuthed(true);
        }

        setLoading(false);
    }, []);

    const login = (user: User, token: string) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        setToken(token);
        setAuthed(true);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setAuthed(false);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, authed }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

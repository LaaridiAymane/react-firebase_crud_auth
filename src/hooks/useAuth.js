import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const { createContext } = require("react");

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, [])

        const value = {
            currentUser
        };

        return(
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        )

}
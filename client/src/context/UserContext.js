import { createContext, useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";


const UserContext = createContext();

function UserContextProvider({ children } ) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/me");
                if (res.ok) {
                  const user = await res.json();
                  setUser(user);
                }
              } catch (err) {
                setError(err.errors);
              } finally {
                setIsLoading(false);
              }
        })()
    }, []);
    
    if (isLoading) return <LoadingScreen />
    return <UserContext.Provider value={{user, setUser, isLoading}}> {children} </UserContext.Provider>
}

export { UserContext, UserContextProvider };
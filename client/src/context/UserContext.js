import { createContext, useState, useEffect } from "react";
import LoadingScreen from "../components/ui/LoadingScreen";
import ErrorPage from "../components/pages/ErrorPage";


const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const user = await res.json();
          setUser(user)
        }
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser()
  }, []);

  if (isLoading) return <LoadingScreen />
  if (fetchError) return <ErrorPage error={fetchError} />
  return <UserContext.Provider value={{ user, setUser, isLoading }}> {children} </UserContext.Provider>
}

export { UserContext, UserContextProvider };
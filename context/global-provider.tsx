import {useState, useEffect, useContext, createContext, ReactNode} from "react";

import {getCurrentUser} from "@/lib/appwrite";

interface GlobalContextProps {
  isLogged: boolean;
  isLoading: boolean;
  user: UserDetailsProps;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useGlobalContext muse be used withing a GlobalProvider");
  }

  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {};
  }, [isLogged]);

  return (
    <GlobalContext.Provider
      value={{isLogged, isLoading, user, setIsLogged, setUser}}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

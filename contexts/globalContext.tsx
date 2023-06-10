import React, { useState } from 'react';

interface IGlobalContextProps {
  user: any;
  loading: boolean;
  accessToken: string;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  setAccessToken: (accessToken: string) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: null,
  loading: true,
  accessToken: '',
  setUser: () => {},
  setLoading: () => {},
  setAccessToken: () => {},
});

export const GlobalContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        user: user,
        loading: isLoading,
        accessToken: accessToken,
        setUser: setUser,
        setLoading: setIsLoading,
        setAccessToken: setAccessToken,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
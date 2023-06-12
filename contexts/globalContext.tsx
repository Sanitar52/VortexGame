import React, { useState } from 'react';
import cookie from 'cookie';
interface IGlobalContextProps {
  user: any;
  loading: boolean;
  accessToken: string;
  refreshTokenCookie: (req: any) => void;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshTokenCookie: (refreshToken: string, res: any) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: null,
  loading: true,
  accessToken: '',
  refreshTokenCookie: () => {},
  setUser: () => {},
  setLoading: () => {},
  setAccessToken: () => {},
  setRefreshTokenCookie: () => {},
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
        refreshTokenCookie: (req: any) => {
            const cookies = cookie.parse(req.headers.cookie || '');
            const refreshToken = cookies.refreshToken || '';
            setAccessToken(refreshToken);
            return refreshToken;
        },
        setUser: setUser,
        setLoading: setIsLoading,
        setAccessToken: setAccessToken,
        setRefreshTokenCookie: (refreshToken: string, res: any) => {
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('accessToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60,
                    sameSite: 'strict',
                    path: '/',
                    })
                );

            }
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
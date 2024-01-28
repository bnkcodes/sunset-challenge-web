import { createContext, useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { localStorageKeys } from '../config/localStorageKeys';
import { usersService } from '../services/usersService';
import { LaunchScreen } from '../../view/components/LaunchScreen';
import { User } from '../entities/User';

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()


  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storedAccessToken;
  });

  const { isError, isLoading, isSuccess, data,  } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => usersService.me(),
    enabled: signedIn,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, [])

  const signout = useCallback(async () => {
    setSignedIn(false);
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    queryClient.removeQueries({ queryKey: ['users', 'me'] });
    queryClient.removeQueries({ queryKey: ['lists'] });
    queryClient.removeQueries({ queryKey: ['tasks'] });

  }, [queryClient])

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!')

      signout();
    }
  }, [isError, signout])

  return (
    <AuthContext.Provider value={{
      signedIn: isSuccess && signedIn,
      user: data,
      signin,
      signout
    }}>
      <LaunchScreen isLoading={isLoading} />

      {!isLoading && children}
    </AuthContext.Provider>
  )
}


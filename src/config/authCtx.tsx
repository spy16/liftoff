import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, signIn, signOut } from "./firebase";
import { CircularProgress, Flex } from "@chakra-ui/react";

type AuthCtxValue = {
  user: User | null;
  loading: boolean;
  signIn: (cb: VoidFunction) => void;
  signOut: (cb: VoidFunction) => void;
};

const AuthContext = createContext<AuthCtxValue>({
  user: null,
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onIdTokenChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  const value = {
    user: currentUser,
    loading: loading,
    signIn: async (callback) => {
      await signIn().then(() => {
        if (callback) {
          callback();
        }
      });
    },
    signOut: async (callback) => {
      await signOut().then(() => {
        if (callback) {
          callback();
        }
      });
    },
  } as AuthCtxValue;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

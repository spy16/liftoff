import React from "react";
import { CircularProgress } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../config/authCtx";

type Props = {
  children: JSX.Element;
};

function RequireAuth({ children }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  return (
    <>
      {loading && <CircularProgress size="25px" isIndeterminate />}
      {!loading && user && children}
      {!loading && !user && (
        <Navigate to="/" replace state={{ from: location }} />
      )}
    </>
  );
}

export default RequireAuth;

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function RequireAuth({ children }: Props) {
  const { authed } = useAuth();
  const location = useLocation();
  console.log(authed)

  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }


  return children;
}

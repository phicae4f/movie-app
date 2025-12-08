import { useEffect, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { openModal } from "../store/slices/modalSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(openModal("login"));
    }
  }, [user, dispatch]);

  if (!user) {
    return null;
  }
  return <>{children}</>;
};

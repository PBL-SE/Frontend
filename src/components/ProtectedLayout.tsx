import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { checkSession } from "../api/auth";

const ProtectedLayout = () => {
  const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "unauthenticated" | "onboarding">("loading");

  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await checkSession();

        // If session (cookie) is missing, redirect to "/"
        if (!session.existing) {
          setAuthStatus("unauthenticated");
          return;
        }

        // If session exists but onboarding is false, go to onboarding
        if (!session.user.onboarded) {
          setAuthStatus("onboarding");
          return;
        }

        // Both session and onboarding are valid, proceed
        setAuthStatus("authenticated");
      } catch (error) {
        console.error("Error verifying session:", error);
        setAuthStatus("unauthenticated");
      }
    };

    verifySession();
  }, []);

  if (authStatus === "loading") return <div>Loading...</div>;
  if (authStatus === "unauthenticated") return <Navigate to="/" replace />;
  if (authStatus === "onboarding") return <Navigate to="/onboarding" replace />;

  return <Outlet />;
};

export default ProtectedLayout;

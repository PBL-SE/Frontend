import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { checkSession } from "../api/auth";

const OnboardingLayout = () => {
  const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "unauthenticated" | "completed">("loading");

  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await checkSession();

        if (!session.existing) {
          setAuthStatus("unauthenticated");
          return;
        }

        if (session.user.onboarded) {
          setAuthStatus("completed");
          return;
        }

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
  if (authStatus === "completed") return <Navigate to="/home" replace />;

  return <Outlet />;
};

export default OnboardingLayout;

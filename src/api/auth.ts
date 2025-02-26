export const checkSession = async () => {
  try {
    console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

    const backendURL = import.meta.env.VITE_BACKEND_URL
    console.log(backendURL)
    console.log("🔄 Sending request to /me...");
    const response = await fetch(`${backendURL}/api/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    console.log("📥 Response from /me:", data);

    if (!response.ok) {
      console.log("❌ No active session found.");
      return { existing: false };
    }

    console.log("✅ Active session found.");
    return data;
  } catch (error) {
    console.error("❌ Error checking session:", error);
    return { existing: false };
  }
};



export const checkOnboarding = async () => {
  try {
    console.log("🔄 Sending request to /onboarding-status...");
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const response = await fetch(`${backendURL}/api/auth/onboarding-status`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    console.log("📥 Response from /onboarding-status:", data);

    if (!response.ok) {
      console.log("❌ Onboarding status not found.");
      return { onboarded: false };
    }

    console.log("✅ Onboarding status received:", data.user.onboarded);
    return data;
  } catch (error) {
    console.error("❌ Error checking onboarding:", error);
    return { onboarded: false };
  }
};

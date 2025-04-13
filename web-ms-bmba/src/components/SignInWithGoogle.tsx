// src/components/SignInWithGoogle.tsx
import React from "react";

const SignInWithGoogle = ({ userRole }: { userRole: string }) => {
  const handleLoginWithGoogle = () => {
    if (!userRole) {
      alert("Please select a role before signing in.");
      return;
    }

    // You can append userRole in query if needed server-side
    const returnUrl = encodeURIComponent("http://localhost:3000"); // or whatever your frontend URL is
    window.location.href = `https://localhost:5280/api/auth/google-login?returnUrl=${returnUrl}&role=${userRole}`;
  };

  return (
    <button onClick={handleLoginWithGoogle}>
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogle;

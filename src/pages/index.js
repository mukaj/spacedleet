import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/auth/AuthContext";

export default function Home() {
  const { authData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authData.isAuthenticated) {
      router.push("/login");
    }
  }, [authData.isAuthenticated, router]);

  if (!authData.isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>please wait to be redirected to login</p>
      </div>
    );
  }

  return <div>hello</div>;
}

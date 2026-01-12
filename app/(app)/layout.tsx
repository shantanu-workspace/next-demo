import { logoutUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function logout() {
    "use server";
    await logoutUser();
    redirect("/auth/login");
  }

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 20px",
          background: "#222",
          color: "white",
        }}
      >
        <span>Next Mastery Learning</span>

        <form action={logout}>
          <button type="submit">Logout</button>
        </form>
      </header>

      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}

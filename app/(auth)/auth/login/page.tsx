import { redirect } from "next/navigation";
import { loginUser } from "@/lib/auth/utils";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;
  const error = params?.error;

  async function login(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (email === "admin@test.com" && password === "1234") {
      await loginUser();

      redirect("/users");
    }

    // Failure path
    redirect("/auth/login?error=Invalid%20email%20or%20password");
  }

  return (
    <div>
      <h1>Login</h1>

      <form action={login}>
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "8px" }}>
          {error}
        </p>
      )}

    <a href="/auth/signup">Create an account</a>
    </div>


  );
}

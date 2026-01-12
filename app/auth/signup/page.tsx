import { redirect } from "next/navigation";

export default function SignupPage() {
  async function signup(formData: FormData) {
    "use server";

    // For now, just redirect to login
    redirect("/auth/login?error=Account%20created.%20Please%20login.");
  }

  return (
    <div>
      <h1>Signup</h1>

      <form action={signup}>
        <input name="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

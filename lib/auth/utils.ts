import { cookies } from "next/headers";

export async function loginUser() {
  const store = await cookies();
  store.set("auth", "true", {
    httpOnly: true,
    path: "/",
  });
}

export async function logoutUser() {
  const store = await cookies();
  store.delete("auth");
}

export async function isAuthenticated() {
  const store = await cookies();
  return store.get("auth")?.value === "true";
}

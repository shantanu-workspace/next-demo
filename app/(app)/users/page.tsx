export const dynamic = "force-dynamic";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logoutUser } from "@/lib/auth/utils";

async function getUsers() {
  const data = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });

  return data.json();
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const users = await getUsers();

  const params = searchParams ? await searchParams : undefined;
  const error = params?.error;


  async function addUsers(formdata: FormData){
    "use server";
  
    const name = formdata.get("name")?.toString().trim();

    if (!name) {
      redirect("/users?error=Name%20cannot%20be%20empty");
    }
  
    await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify({ name })
    });

    //now the current page will get stale as a new user is added via api so we revalidate the path
    revalidatePath("/users");

  }

  return (
    <div>
      <h1>Users: </h1>

      <form action={addUsers}>
        <input name="name" placeholder="Enter the Name" />
        <button type="submit">Add User</button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "8px" }}>
          {error}
        </p>
      )}

      <ul>
        {users.map((u:any , i: number) => (
          <li key={i}>{u.name}</li>
        ))}
      </ul>      

    </div>

  );
} 
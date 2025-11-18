import { Button } from "@nextui-org/react";
import { auth } from "@/auth";
import { signIn as signInAction, signOut as signOutAction } from "@/actions";
import UserProfilePage from "@/components/profile";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <form action={signInAction}>
        <Button type="submit">Sign in</Button>
      </form>
      <form action={signOutAction}>
        <Button type="submit">Sign out</Button>
      </form>
      {session?.user ? (
        <div>
          <p>Signed in as {session.user.name}</p>
          {JSON.stringify(session)}
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
        </div>
      )}
      <br />
      <UserProfilePage />
    </div>
  );
}

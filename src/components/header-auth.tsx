"use client";

import {
  Button,
  Avatar,
  NavbarItem,
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@nextui-org/react";
import { signIn as signInAction, signOut as signOutAction } from "@/actions";

import { useSession } from "next-auth/react";

export default function HeaderAuth() {
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";
  const isUserSignedIn = !isSessionLoading && !!session?.user;

  if (isSessionLoading) {
    return null;
  }

  const authContent = isUserSignedIn ? (
    <Popover>
      <PopoverTrigger>
        <Avatar
          src={session?.user?.image ?? undefined}
          className="cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <form action={signOutAction}>
          <Button type="submit" color="danger" variant="flat">
            Sign Out
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  ) : (
    <NavbarItem>
      <form action={signInAction}>
        <Button type="submit" color="primary" variant="flat">
          Sign In
        </Button>
      </form>
    </NavbarItem>
  );

  return authContent;
}

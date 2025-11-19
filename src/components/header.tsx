import {
  Input,
  Button,
  Avatar,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@nextui-org/react";
import { signIn as signInAction, signOut as signOutAction } from "@/actions";

import { auth } from "@/auth";
import paths from "@/path";

export default async function Header() {
  const session = await auth();
  const isUserSignedIn = !!session?.user;

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

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={paths.home()} className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input type="text" placeholder="Search topics" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">{authContent}</NavbarContent>
    </Navbar>
  );
}

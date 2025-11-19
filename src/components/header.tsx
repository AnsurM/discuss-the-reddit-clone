import {
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import paths from "@/path";
import HeaderAuth from "./header-auth";

export default async function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={paths.home()} className="font-bold text-inherit">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input type="text" placeholder="Search topics" />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}

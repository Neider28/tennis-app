"use client"
import { UserData } from "@/interfaces/user";
import { removeTokenCookie } from "@/utils/cookie.util";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header({ user }: { user: UserData }) {
  const router = useRouter();

  const logout = () => {
    removeTokenCookie();
    router.push('/');
  };

  return (
    <Navbar className="py-6">
      <NavbarBrand>
        <Link href="/">
          <Image
            width={100}
            alt="NextUI hero Image"
            src="https://res.cloudinary.com/dulkx1wtf/image/upload/v1700350396/logo_fdx7kd.png"
          />
        </Link>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="success"
              name="Jason Hughes"
              size="md"
              src={user.profileImage}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" href="/profile" textValue="Profile">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" textValue="Settings" href="/edit-profile">Edit My Profile</DropdownItem>
            <DropdownItem key="logout" textValue="Log Out" color="danger" onPress={logout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

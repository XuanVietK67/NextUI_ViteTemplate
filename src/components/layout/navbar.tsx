import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { IoSettingsOutline } from "react-icons/io5";

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/layout/icons";
import { Avatar, Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ThemeSwitch } from "./theme-switch";
import { useAuthStore } from "@/store/AuthStore";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          Xuan Viet
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  let { access_Token, user, setUser, setAccess_Token } = useAuthStore()
  let navigate = useNavigate()


  const handleLogOut = () => {
    useAuthStore.persist.clearStorage()
    setUser(undefined)
    setAccess_Token(undefined)
  }
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            id="homepage"
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item: any, index: number) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                id={`id-${index}`}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
          {
            user?.role !== 'student' ?
              <NavbarItem key={'dashboard'}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  id={`id-${user?._id}`}
                  href={'/dashboard'}
                >
                  Dashboard
                </Link>
              </NavbarItem>
              :
              <>

              </>
          }
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        {
          access_Token ?

            <div className="flex flex-row items-center gap-3">
              {user?.image ?
                <div className="flex flex-row items-center gap-3">
                  <Avatar src={user.image} size="lg" />
                  {/* <Dropdown >
                    <DropdownTrigger>
                      <Button
                        // variant="bordered"
                        isIconOnly
                      >
                        <IoSettingsOutline size={40}/>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Example with disabled actions">
                      <DropdownItem key="delete" className="text-danger" color="danger" onClick={()=>handleLogOut()}>
                        Log out
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown> */}
                </div>
                :
                <Avatar name={user?.username} />
              }
              <Dropdown >
                <DropdownTrigger>
                  <Button
                    // variant="bordered"
                    isIconOnly
                  >
                    <IoSettingsOutline size={40} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Example with disabled actions">
                  <DropdownItem key="delete" className="text-danger" color="danger" onClick={() => handleLogOut()}>
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            :
            <NavbarItem className="hidden md:flex flex gap-3">
              <Button
                // isExternal
                // as={Link}
                className="text-sm font-normal text-default-600 bg-default-100"
                // href={'login'}
                // startContent={<HeartFilledIcon className="text-danger" />}
                variant="flat"
              >
                <Link href={'login'}>
                  <HeartFilledIcon className="text-danger" />
                  Login
                </Link>
              </Button>
              <Button
                // isExternal
                // as={Link}
                className="text-sm font-normal text-default-600 bg-default-100"
                // href={'login'}
                // startContent={<HeartFilledIcon className="text-danger" />}
                variant="flat"
              >
                <Link href={'register'}>
                  <HeartFilledIcon className="text-danger" />
                  Register
                </Link>
              </Button>
            </NavbarItem>
        }

      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

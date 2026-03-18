import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@heroui/react";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const LoggedMenuItems = ["Home", "Logout"];
  const UnLoggedMenuItems = [, "Register", "Login"];
  const { userLogin, setUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <Navbar className="bg-blue-900">
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <Link to="/">Nose-book</Link>
        </p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarContent className="hidden sm:flex gap-4" justify="en">
          {userLogin !== null && (
            <NavbarItem isActive>
              <Link aria-current="page" color="secondary" to="/">
                Home
              </Link>
            </NavbarItem>
          )}

          {userLogin === null && (
            <>
              <NavbarItem>
                <Link color="foreground" to="/login">
                  Login
                </Link>
              </NavbarItem>

              <NavbarItem>
                <Link color="foreground" to="/register">
                  Register
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings">
              <Link to="/profile">Profile</Link>
            </DropdownItem>
            <DropdownItem onClick={() => logOut()} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {userLogin
          ? LoggedMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  onClick={
                    item === "Logout" &&
                    function () {
                      logOut();
                    }
                  }
                  className="w-full block"
                  color={
                    index === 2
                      ? "primary"
                      : index === LoggedMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  to={`/${item === "Logout" && item ? "login" : item}`}
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))
          : UnLoggedMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full block"
                  color={
                    index === 2
                      ? "primary"
                      : index === UnLoggedMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  to={`/${item}`}
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
      </NavbarMenu>
    </Navbar>
  );
}

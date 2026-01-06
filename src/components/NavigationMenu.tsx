import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogIn,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import useAuth from "../hooks/useAuth";

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface NavItem {
  label: string;
  href: string;
  type: "link" | "dropdown";
  icon?: React.ReactNode;
  dropdownItems?: DropdownItem[];
  requiresAuth?: boolean;
}

interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  requiresAuth?: boolean;
}

const NavigationMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const { user, signOut } = useAuth();

  // Mock logout function
  const handleLogout = async () => {
    try {
      await signOut();
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLocation("/");
    }
  };

  // Navigation items configuration
  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      type: "link",
      icon: <Home className="w-4 h-4" />,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      type: "link",
      icon: <LayoutDashboard className="w-4 h-4" />,
      requiresAuth: true,
    },
  ];

  // User dropdown items
  const userDropdownItems: DropdownItem[] = [
    {
      label: "Profile",
      href: "/profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <LogOut className="w-4 h-4" />,
    },
  ];

  const isActive = (href: string) => location === href;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  // Filter navigation items based on authentication
  //   const filteredNavItems = navItems.filter(item =>
  //     !item.requiresAuth || (item.requiresAuth && isLoggedIn)
  //   );

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex shrink-0">
              <Link href="/">
                <span className="text-2xl font-bold text-blue-600 cursor-pointer">
                  Logo
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Navigation Links */}
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                <Link href={item.href}>
                  <div
                    className={` flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </div>
                </Link>
              </div>
            ))}

            {/* Login/User Profile Dropdown */}
            <div className="relative">
              {!user?.user_metadata?.name ? (
                <Link href="/login">
                  <div
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive("/login")
                        ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </div>
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isUserDropdownOpen
                        ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      {
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">
                            {user?.user_metadata?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      }
                      <span className="mr-2">{user?.user_metadata?.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {userDropdownItems.map((item) => (
                        <React.Fragment key={item.href}>
                          {item.label === "Logout" ? (
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                            >
                              {item.icon && (
                                <span className="mr-3 text-gray-400">
                                  {item.icon}
                                </span>
                              )}
                              {item.label}
                            </button>
                          ) : (
                            <Link href={item.href}>
                              <div
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                                onClick={() => setIsUserDropdownOpen(false)}
                              >
                                {item.icon && (
                                  <span className="mr-3 text-gray-400">
                                    {item.icon}
                                  </span>
                                )}
                                {item.label}
                              </div>
                            </Link>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    {item.label}
                  </div>
                </Link>
              ))}

              {/* Login/User Profile */}
              {!user?.user_metadata?.name ? (
                <Link href="/login">
                  <div
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                      isActive("/login")
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4 mr-3" />
                    Login
                  </div>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={toggleUserDropdown}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isUserDropdownOpen
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      {
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">
                            {user?.user_metadata?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      }
                      <span>{user?.user_metadata?.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile User Dropdown */}
                  {isUserDropdownOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {userDropdownItems.map((item) => (
                        <React.Fragment key={item.href}>
                          {item.label === "Logout" ? (
                            <button
                              onClick={() => {
                                handleLogout();
                                setIsMenuOpen(false);
                              }}
                              className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                            >
                              {item.icon && (
                                <span className="mr-3 text-gray-400">
                                  {item.icon}
                                </span>
                              )}
                              {item.label}
                            </button>
                          ) : (
                            <Link href={item.href}>
                              <div
                                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200 cursor-pointer"
                                onClick={() => {
                                  setIsUserDropdownOpen(false);
                                  setIsMenuOpen(false);
                                }}
                              >
                                {item.icon && (
                                  <span className="mr-3 text-gray-400">
                                    {item.icon}
                                  </span>
                                )}
                                {item.label}
                              </div>
                            </Link>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu;

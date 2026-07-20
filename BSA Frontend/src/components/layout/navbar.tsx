"use client";

import Link from "next/link";
import { Search, Menu, X, LogOut, Settings, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Investment Plan", href: "#" },
  { label: "Home", href: "/" },
  { label: "Our Brands", href: "#" },
  { label: "Shop", href: "#" },
  { label: "Collection", href: "#" },
  { label: "Gifts", href: "#" },
  { label: "Shop By Categories", href: "#" },
  { label: "Create Your Own", href: "#" },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#f4efe4] border-b border-[#c9a24a]/20 shadow-lg shadow-[#c9a24a]/10 transition-all duration-300">
      {/* Top Bar */}
      <div className="px-4 md:px-8 py-4 border-b border-[#c9a24a]/10">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-[#c9a24a]">♦</div>
            <span className="text-xl font-bold tracking-wider text-[#17120e]">
              SATVA <span className="text-[#c9a24a]">GOLD</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6058]" />
              <input
                type="text"
                placeholder="Search Pendent"
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#c9a24a]/20 rounded-lg text-[#17120e] placeholder-[#6b6058] focus:outline-none focus:ring-2 focus:ring-[#c9a24a]"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Account Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  isDropdownOpen
                    ? "bg-[#c9a24a] text-white shadow-lg shadow-[#c9a24a]/30"
                    : "bg-linear-to-r from-[#c9a24a] to-[#b89438] text-white hover:shadow-lg hover:shadow-[#c9a24a]/40"
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-sm">{isAuthenticated ? user?.name : "Account"}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl shadow-black/20 overflow-hidden z-50 border border-[#c9a24a]/10 animate-in fade-in slide-in-from-top-2 duration-200">
                  {isAuthenticated ? (
                    <>
                      {/* Logged In Menu Header */}
                      <div className="px-5 py-4 bg-linear-to-r from-[#c9a24a]/5 to-[#0f3d2e]/5 border-b border-[#c9a24a]/15">
                        <p className="text-sm font-semibold text-[#17120e]">{user?.name}</p>
                        <p className="text-xs text-[#6b6058] truncate">{user?.email}</p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            router.push("/profile");
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-[#17120e] hover:bg-[#f4efe4] transition-colors group"
                        >
                          <User className="w-4 h-4 text-[#c9a24a] group-hover:scale-110 transition-transform" />
                          <span>My Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            router.push("/settings");
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-[#17120e] hover:bg-[#f4efe4] transition-colors group"
                        >
                          <Settings className="w-4 h-4 text-[#c9a24a] group-hover:rotate-12 transition-transform" />
                          <span>Settings</span>
                        </button>

                        <div className="my-1 border-t border-[#c9a24a]/10" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                        >
                          <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Not Logged In Menu */}
                      <div className="py-2">
                        <Link
                          href="/login"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-sm text-[#17120e] hover:bg-[#f4efe4] transition-colors group"
                        >
                          <User className="w-4 h-4 text-[#c9a24a] group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Sign In</span>
                        </Link>

                        <div className="my-1 border-t border-[#c9a24a]/10" />

                        <Link
                          href="/register"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-white bg-linear-to-r from-[#c9a24a] to-[#b89438] hover:shadow-lg hover:shadow-[#c9a24a]/20 transition-all m-2 rounded-lg"
                        >
                          <span>Create Account</span>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-[#17120e]" />
              ) : (
                <Menu className="w-5 h-5 text-[#17120e]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden md:block"
        } px-4 md:px-8 py-4`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#17120e] hover:text-[#c9a24a] transition-colors py-2 md:py-0"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

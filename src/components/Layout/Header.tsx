import { useState } from "react";
import { Sun, Moon, User, LogOut, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationTabs = [
  { id: "search", label: "Search & Map", path: "/" },
  { id: "codesystems", label: "CodeSystems", path: "/codesystems" },
  { id: "conceptmaps", label: "ConceptMaps", path: "/conceptmaps" },
  { id: "fhir", label: "FHIR Bundles", path: "/fhir" },
  { id: "analytics", label: "Analytics Dashboard", path: "/analytics" },
  { id: "about", label: "About", path: "/about" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span>
                <a target="_blank" className="text-white font-bold">
                  न
                </a>
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">NAMASTE</h1>
              <p className="text-xs text-muted-foreground">
                Terminology Mapping
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationTabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  location.pathname === tab.path
                    ? "nav-active"
                    : "nav-inactive border-transparent"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium">Dr. Anya Sharma</p>
                    <p className="text-xs text-muted-foreground">Clinician</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

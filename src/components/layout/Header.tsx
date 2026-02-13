"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  User,
  LogOut,
  LayoutDashboard,
  Wrench,
  Bell,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/ustalar", label: "Ustalar" },
  { href: "/kategoriler", label: "Kategoriler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = null as unknown as null | {
    name?: string | null;
    surname?: string | null;
    avatar?: string | null;
    role?: string;
  };
  const logout = () => {};

  const getInitials = (name?: string | null, surname?: string | null) => {
    return `${name?.[0] ?? ""}${surname?.[0] ?? ""}`.toUpperCase();
  };

  const getDashboardLink = () => {
    if (!user) return "/giris";
    const role = (user as { role?: string }).role;
    switch (role) {
      case "ADMIN":
        return "/admin";
      case "CRAFTSMAN":
        return "/usta-panel";
      default:
        return "/panel";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-brand-text hidden sm:block">
              Çanakkale <span className="text-brand-primary">Ustam</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-brand-primary transition-colors rounded-md hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* Bildirimler */}
                <Button variant="ghost" size="icon" className="relative" asChild>
                  <Link href={`${getDashboardLink()}/mesajlar`}>
                    <Bell className="h-5 w-5" />
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      0
                    </Badge>
                  </Link>
                </Button>

                {/* Kullanıcı Menüsü */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hidden md:flex items-center gap-2 pl-2 pr-3"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar ?? undefined} />
                        <AvatarFallback className="bg-brand-primary text-white text-xs">
                          {getInitials(user.name, user.surname)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {user.name}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        href={getDashboardLink()}
                        className="flex items-center gap-2"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Panelim
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`${getDashboardLink()}/profil`}
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Profilim
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => logout()}
                      className="flex items-center gap-2 text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      Çıkış Yap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/giris">Giriş Yap</Link>
                </Button>
                <Button asChild>
                  <Link href="/kayit">Kayıt Ol</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        onLogout={logout}
        dashboardLink={getDashboardLink()}
      />
    </header>
  );
}

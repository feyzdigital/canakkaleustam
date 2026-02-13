"use client";

import Link from "next/link";
import {
  Home,
  Search,
  Grid3X3,
  Info,
  Phone,
  User,
  LogOut,
  LogIn,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null | undefined;
  onLogout: () => void;
  dashboardLink: string;
}

const navLinks = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/ustalar", label: "Ustalar", icon: Search },
  { href: "/kategoriler", label: "Kategoriler", icon: Grid3X3 },
  { href: "/hakkimizda", label: "Hakkımızda", icon: Info },
  { href: "/iletisim", label: "İletişim", icon: Phone },
];

export function MobileNav({
  open,
  onClose,
  user,
  onLogout,
  dashboardLink,
}: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left text-brand-primary">
            Çanakkale Ustam
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-1">
          {user && (
            <>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.image ?? undefined} />
                  <AvatarFallback className="bg-brand-primary text-white">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Separator className="my-3" />
            </>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors"
            >
              <link.icon className="h-5 w-5 text-muted-foreground" />
              {link.label}
            </Link>
          ))}

          <Separator className="my-3" />

          {user ? (
            <>
              <Link
                href={dashboardLink}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              >
                <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
                Panelim
              </Link>
              <Link
                href={`${dashboardLink}/profil`}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              >
                <User className="h-5 w-5 text-muted-foreground" />
                Profilim
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors w-full text-destructive"
              >
                <LogOut className="h-5 w-5" />
                Çıkış Yap
              </button>
            </>
          ) : (
            <div className="space-y-2 p-3">
              <Button className="w-full" asChild>
                <Link href="/giris" onClick={onClose}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Giriş Yap
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/kayit" onClick={onClose}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Kayıt Ol
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

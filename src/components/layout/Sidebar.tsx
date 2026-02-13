"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  User,
  Wrench,
  Star,
  Settings,
  Users,
  FolderTree,
  BarChart3,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const customerLinks: SidebarLink[] = [
  { href: "/panel", label: "Panel", icon: LayoutDashboard },
  { href: "/panel/taleplerim", label: "Taleplerim", icon: FileText },
  { href: "/panel/mesajlar", label: "Mesajlar", icon: MessageSquare },
  { href: "/panel/profil", label: "Profilim", icon: User },
];

const craftsmanLinks: SidebarLink[] = [
  { href: "/usta-panel", label: "Panel", icon: LayoutDashboard },
  { href: "/usta-panel/hizmetlerim", label: "Hizmetlerim", icon: Wrench },
  { href: "/usta-panel/talepler", label: "Talepler", icon: FileText },
  { href: "/usta-panel/degerlendirmeler", label: "Değerlendirmeler", icon: Star },
  { href: "/usta-panel/mesajlar", label: "Mesajlar", icon: MessageSquare },
  { href: "/usta-panel/profil", label: "Profilim", icon: User },
];

const adminLinks: SidebarLink[] = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/ustalar", label: "Ustalar", icon: Wrench },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: Users },
  { href: "/admin/kategoriler", label: "Kategoriler", icon: FolderTree },
  { href: "/admin/raporlar", label: "Raporlar", icon: BarChart3 },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
];

interface SidebarProps {
  role: "CUSTOMER" | "CRAFTSMAN" | "ADMIN";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { isSidebarCollapsed, setSidebarCollapsed } = useAppStore();

  const links =
    role === "ADMIN"
      ? adminLinks
      : role === "CRAFTSMAN"
        ? craftsmanLinks
        : customerLinks;

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r bg-background h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/panel" &&
              link.href !== "/usta-panel" &&
              link.href !== "/admin" &&
              pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-primary text-white"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              title={isSidebarCollapsed ? link.label : undefined}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {!isSidebarCollapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              isSidebarCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>
    </aside>
  );
}

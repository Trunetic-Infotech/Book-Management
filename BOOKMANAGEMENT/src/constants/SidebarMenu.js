import {
  Home,
  BookOpen,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export const adminMenu = [
  { label: "Home", icon: Home, path: "/admin/dashboard" },
  { label: "BookCatalog", icon: BookOpen, path: "/admin/bookcatalog" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
  { label: "Logout", icon: LogOut, path: "/admin/logout" },
];

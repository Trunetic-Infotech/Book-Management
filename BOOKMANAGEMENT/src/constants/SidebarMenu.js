import {
  Home,
  BookOpen,
  Users,
  Settings,
  LogOut,
  BookDashed,
  BookCheck,
  BookPlus,
} from "lucide-react";

export const adminMenu = [
  { label: "Home", icon: Home, path: "/admin/dashboard" },
  { label: "BookCatalog", icon: BookOpen, path: "/admin/bookcatalog" },

  { label: "Logout", icon: LogOut, path: "/admin/logout" },
  { label: "AddBook", icon: BookPlus, path: "/admin/addbook" },
];

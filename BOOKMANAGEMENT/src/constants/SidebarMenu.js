import {
  Home,
  BookOpen,
  Users,
  LogOut,
  BookDashed,
  BookCheck,
  BookPlus,
} from "lucide-react";

export const adminMenu = [
  { label: "Home", icon: Home, path: "/admin/dashboard" },
  { label: "BookCatalog", icon: BookOpen, path: "/admin/bookcatalog" },
  { label: "Order Details", icon: Users, path: "/admin/orderDetails" },
  { label: "Logout", icon: LogOut, path: "/admin/logout" }, 
];

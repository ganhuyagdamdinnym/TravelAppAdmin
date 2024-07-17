import Link from "next/link";
import {
  Badge,
  Dog,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Plus,
  Search,
  Sheet,
  ShoppingCart,
  Users,
} from "lucide-react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Dashboard } from "./DashBoard";
import { useProduct } from "@/context/productProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Orders } from "./Orders";
import { Create } from "./Create";
import { Input } from "@/components/ui/input";
import { SheetTrigger, SheetContent } from "@/components/ui/sheet";
export function Dashboard2() {
  const { totalProduct } = useProduct();
  console.log("s", totalProduct);
  const [activePart, setActivePart] = useState<string>("Products");
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <FontAwesomeIcon icon={faMountainSun} className="mr-2" />
              <span className="">Travel</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg ${
                  activePart == "Products" ? " bg-muted" : null
                } px-3 py-2 text-primary transition-all hover:text-primary`}
                onClick={() => setActivePart("Products")}
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg ${
                  activePart == "Orders" ? " bg-muted" : null
                } px-3 py-2 text-primary transition-all hover:text-primary`}
                onClick={() => setActivePart("Orders")}
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
              </Link>

              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg ${
                  activePart == "Create" ? " bg-muted" : null
                } px-3 py-2 text-primary transition-all hover:text-primary`}
                onClick={() => setActivePart("Create")}
              >
                <Plus className="h-4 w-4" />
                Create
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex flex-row">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
            <ModeToggle />
          </div>
        </header>
        <div className="w-60 m-4">
          {/* {activePart === "Products" ? (
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>{totalProduct} </CardTitle>
                <CardDescription>Total Products</CardDescription>
              </CardHeader>
            </Card>
          ) : activePart === "Orders" ? (
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>{totalProduct} </CardTitle>
                <CardDescription>Total Products</CardDescription>
              </CardHeader>
            </Card>
          ) : activePart === "Create" ? (
            <Card x-chunk="dashboard-02-chunk-0">
              <Button size="sm" className="w-full">
                create
              </Button>
            </Card>
          ) : null} */}
        </div>
        {activePart === "Products" ? (
          <Dashboard />
        ) : activePart === "Orders" ? (
          <Orders />
        ) : activePart === "Create" ? (
          <Create />
        ) : null}
      </div>
    </div>
  );
}

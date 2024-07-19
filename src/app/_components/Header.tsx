"use client";
import Link from "next/link";
import { Badge, Package, Plus, Search, ShoppingCart, User } from "lucide-react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { useProduct } from "@/context/productProvider";
import { Input } from "@/components/ui/input";
export function Header() {
  const { totalProduct } = useProduct();
  console.log("s", totalProduct);
  const [activePart, setActivePart] = useState<string>("Products");
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
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
                href="/"
                className={`mx-[-0.65rem]  ${
                  activePart == "Products" ? " bg-muted text-black" : null
                } flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
                onClick={() => setActivePart("Products")}
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                href="/orders"
                className={`mx-[-0.65rem]  ${
                  activePart == "Orders" ? " bg-muted text-black" : null
                } flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
                onClick={() => setActivePart("Orders")}
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-black">
                  10
                </Badge>
              </Link>
              <Link
                href="/create"
                className={`mx-[-0.65rem]  ${
                  activePart == "Create" ? " bg-muted text-black" : null
                } flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
                onClick={() => setActivePart("Create")}
              >
                <Plus className="h-4 w-4" />
                Create
              </Link>
              <Link
                href="#"
                className={`mx-[-0.65rem]  ${
                  activePart == "Customers" ? " bg-muted text-black" : null
                } flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground`}
                onClick={() => setActivePart("Customers")}
              >
                <User className="h-4 w-4" />
                Customers
              </Link>
            </nav>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col">
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
      </div> */}
    </div>
  );
}
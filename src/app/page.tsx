"use client";

import { Products } from "./_components/Products";
import { useState } from "react";
export default function Home() {
  const [isClickCreate, setIsClickCreate] = useState<boolean>(false);
  const [isClickBars, setIsClickBars] = useState<boolean>(false);

  return (
    <div className="flex flex-row w-screen h-screen">
      <Products />
    </div>
  );
}

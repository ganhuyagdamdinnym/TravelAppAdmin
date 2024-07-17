"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/free-solid-svg-icons";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Dashboard } from "./_components/DashBoard";
import { Create } from "./_components/Create";
import { useState } from "react";
import { use } from "react";
import { CommandDemo } from "./_components/Commands";
import { Dashboard2 } from "./_components/Dashboard2";
// import { useProduct } from "@/context/productProvider";
export default function Home() {
  const [isClickCreate, setIsClickCreate] = useState<boolean>(false);
  const [isClickBars, setIsClickBars] = useState<boolean>(false);
  // const { data, loading, error } = useGetAllTravelQuery();
  // const { loading } = useProduct();
  // console.log("test", loading);
  // if (loading) {
  //   return <div>data is loading</div>;
  // }
  return (
    <div className="flex flex-row w-screen h-screen">
      <Dashboard2 />
    </div>
  );
}
{
  /* <div className="h-full w-80 border-r-[1px] border-[#1963E6] ">
        <div className="w-full h-40 flex justify-center items-center">
           <p className="font-semibold text-[20px] text-[#1963E6]">
            Travel Dashboard
           </p>
        </div>
        <div className="w-full h-full flex flex-col gap-2 items-center mt-40">
        <button
          onClick={() => setIsClickCreate(false)}
          className={` ${
            isClickCreate
              ? "bg-[#C6D5F0] text-[#1963E6]"
              : "bg-[#1963E6] text-white"
          }  px-4 py-2 rounded-xl w-40 font-semibold`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setIsClickCreate(true)}
          className={` ${
            isClickCreate == false
              ? "bg-[#C6D5F0] text-[#1963E6]"
              : "bg-[#1963E6] text-white"
          }  px-4 py-2 rounded-xl w-40 font-semibold`}
        >
          Create product
        </button>
        </div>
       
      </div>
      <div className="pt-10 w-full ">
        <div className="w-full h-10 border-b-[1px] border-[#1963E6]"></div>
        {isClickCreate ? <Create /> : <Dashboard />}
      </div> */
}

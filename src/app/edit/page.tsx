"use client";
import { useState, useEffect } from "react";
import { useGet1ProductQuery } from "@/generated";
import { useSearchParams } from "next/navigation";
export default function Edit() {
  const params = useSearchParams();
  const id = params.get("id");
  console.log(id);
  if (!id) {
    return <div>No id parameter found</div>;
  }
  const { data, loading, error } = useGet1ProductQuery({
    variables: {
      input: {
        id: id,
      },
    },
  });

  console.log("datsss", data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>hello</div>;
}

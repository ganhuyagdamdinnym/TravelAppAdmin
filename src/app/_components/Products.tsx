import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProduct } from "@/context/productProvider";
import { TrashButton } from "./trashButton";
import { EdithButton } from "./EditButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export function Products() {
  const { products, setProducts, products2 } = useProduct();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search === "") {
      setProducts(products2);
    } else {
      const result = products2.filter((el) =>
        el?.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(result);
    }
  }, [search]);

  return (
    <div
      className="w-full ml-[280px] mt-[60px] overflow-scroll"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex justify-between">
        <Card x-chunk="dashboard-02-chunk-0" className="w-40">
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>{products?.length} </CardTitle>
            <CardDescription>Total Products</CardDescription>
          </CardHeader>
        </Card>
        <div className="flex w-full max-w-sm items-center space-x-2 mr-[200px]">
          <Input
            type="search"
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Location</TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="w-[50px]">Duration</TableHead>
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[100px]">Rating</TableHead>
            <TableHead className="w-[150px]">price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                <CldImage
                  alt="Sample image"
                  src={product.imageUrl}
                  width="100"
                  height="100"

                  // crop={{
                  //   type: "auto",
                  //   source: true,
                  // }}
                />
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>{product?.location}</TableCell>
              <TableCell>
                {product?.startAt}-{product?.endAt}
              </TableCell>
              <TableCell>{product?.duration}</TableCell>
              <TableCell>{product?.description}</TableCell>
              <TableCell>{product?.rating}</TableCell>
              <TableCell className="flex flex-row gap-2 items-center justify-between">
                {product?.price} $
                <div className="w-32 flex justify-between items-center">
                  <EdithButton id={product?._id} />
                  <TrashButton name={product?.name} id={product?._id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

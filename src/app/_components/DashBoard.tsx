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

export function Dashboard() {
  const { products } = useProduct();
  console.log("pro", products);

  return (
    <Table>
      <TableHeader>
        <TableRow>
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
              <TrashButton name={product?.name} id={product?._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{products.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

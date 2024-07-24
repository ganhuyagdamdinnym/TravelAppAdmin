"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { GetAllTravelQuery, useGetAllTravelQuery } from "@/generated";
// import {useGet}
type RunDown = {
  title: string;
  description: string;
};

type InfoType = {
  runDown: Array<RunDown>;
  note: string;
};

export type ProductType = {
  __typename?: string;
  _id: string;
  name: string;
  description: string | null;
  imageUrl: string;
  duration: string;
  endAt: string;
  facilities?: Array<string> | null;
  location: string;
  price: number;
  rating: number | null;
  startAt: string;
  information?: InfoType;
};

type Props = {
  children: ReactNode;
};

type ContextType = {
  loading: boolean;
  error: any;
  products: ProductType[];
  refetch: () => void;
  totalProduct: number;
  setProducts: Dispatch<SetStateAction<ProductType[]>>;

  products2: ProductType[];
};

const ProductContext = createContext<ContextType>({} as ContextType);

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = ({ children }: Props) => {
  const { loading, data, error, refetch } = useGetAllTravelQuery();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [products2, setProducts2] = useState<ProductType[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  console.log("data", data?.getAllTravel);
  useEffect(() => {
    if (data && data.getAllTravel) {
      setProducts(data.getAllTravel);
      setProducts2(data.getAllTravel);
      setTotalProduct(products?.length);
    }
  }, [data]);
  return (
    <ProductContext.Provider
      value={{
        loading,
        error,
        products,
        refetch,
        totalProduct,
        setProducts,

        products2,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

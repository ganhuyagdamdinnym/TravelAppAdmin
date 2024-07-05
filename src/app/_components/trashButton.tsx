import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useProduct } from "@/context/productProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteProductMutation } from "@/generated";
type PropsType = {
  name: string | null | undefined;
  id: string | null | undefined;
  // RemoveTodo: (title: string) => void;
};
export function TrashButton(props: PropsType) {
  const{refetch}=useProduct()
  const [handleDeleteProduct, { data, loading, error }] =
    useDeleteProductMutation();
  const { name, id } = props;

  //   // const { refetch } = useDeletedTodo();
  //   const [deleteTodo, { data }] = useDeleteTodoFromTrashMutation();
  const HandleRemove = async () => {
    const deleteInput = {
      id: id,
    };
    try {
      await handleDeleteProduct({ variables: { input: deleteInput } }).then((res)=>{
        if(res){
          refetch()
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-4 h-8">
          <FontAwesomeIcon icon={faTrashCan} height={12} width={12} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {name} ?
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={HandleRemove}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

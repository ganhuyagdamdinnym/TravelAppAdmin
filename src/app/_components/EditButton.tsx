import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export function EdithButton(props: Props) {
  const { id } = props;
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/edit?id=${id}`);
  };
  return (
    <Button>
      <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditClick} />
    </Button>
  );
}

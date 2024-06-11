import { useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { editCabin, isEditing };
}

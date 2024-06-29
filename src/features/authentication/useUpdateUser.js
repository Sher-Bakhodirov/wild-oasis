import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    isLoading: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({user}) => {
      toast.success("Successfully updated user");
      queryClient.setQueriesData(["user"], user);
    },

    onError: (error) => {
      toast.success(error.message);
    },
  });

  return { updateUser, isUpdating, error };
}

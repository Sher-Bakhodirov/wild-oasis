import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutService } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: logout,
    isLoading,
    error,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
      toast.success("Logged out");
    },
  });

  return { logout, isLoading, error };
}

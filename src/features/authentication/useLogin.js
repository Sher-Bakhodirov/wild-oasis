import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginService } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isLoading: isLogingIn,
    error,
  } = useMutation({
    mutationFn: loginService,

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Welcome back");
      navigate("/dashboard");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLogingIn, error };
}

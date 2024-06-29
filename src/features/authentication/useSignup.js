import { useMutation } from "@tanstack/react-query";
import { signUp as signUpService } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const {
    mutate: signup,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signUpService,

    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email"
      );
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signup, isLoading, error };
}

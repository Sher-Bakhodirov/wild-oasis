import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteBooking as deleteBookingService,
  getBooking,
  getBookings,
  updateBooking,
} from "../../services/apiBookings";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import toast from "react-hot-toast";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");
  const filterObject = { key: "status", value: filterValue, method: "eq" };
  const filter = filterValue && filterValue !== "all" ? filterObject : null;

  const sortByRaw = searchParams.get("sort_by") || "startDate-desc";
  const [sortByKey, sortDirection] = sortByRaw.split("-");
  const sortBy = { key: sortByKey, direction: sortDirection };

  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    error,
    isLoading,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, currentPage],
    queryFn: () => getBookings(filter, sortBy, currentPage),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, currentPage + 1],
      queryFn: () => getBookings(filter, sortBy, currentPage + 1),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, currentPage - 1],
      queryFn: () => getBookings(filter, sortBy, currentPage - 1),
    });
  }

  return { error, isLoading, bookings, count };
}

export function useBooking(id) {
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", id],
    queryFn: () => getBooking(id),
    retry: false,
  });
  return { booking, isLoading, error };
}

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ type: "active" });
      navigate("/");
    },

    onError: () => {
      toast.error("There was an error while checking in");
    },
  });

  return { checkIn, isCheckingIn };
}

export function useCheckOut() {
  const queryClient = useQueryClient();
  const {
    mutate: checkOut,
    isLoading: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (id) => {
      updateBooking(id, {
        status: "checked-out",
      });
    },
    onSuccess: (data) => {
      toast.success(`Successfully checked out booking #${data?.id}`);
      queryClient.invalidateQueries({ type: "active" });
    },

    onError: (data) => {
      toast.error(`Could not check out booking #${data.id}`);
    },
  });

  return { checkOut, isCheckingOut };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingService,
    onSuccess: () => {
      toast.success("Successfully deleted cabin");
      queryClient.invalidateQueries({ type: "active" });
      navigate("/bookings")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteBooking, isDeleting };
}

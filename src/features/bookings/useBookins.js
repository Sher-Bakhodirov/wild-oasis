import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookins() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filterObject = { key: "status", value: filterValue, method: "eq" };
  const filter = filterValue && filterValue !== "all" ? filterObject : null;

  const sortByRaw = searchParams.get("sort_by") || "startDate-desc";
  const [sortByKey, sortDirection] = sortByRaw.split("-")
  const sortBy = {key: sortByKey, direction: sortDirection}

  const {
    error,
    isLoading,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });

  return { error, isLoading, bookings };
}

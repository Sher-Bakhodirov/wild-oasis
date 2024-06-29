import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { getToday } from "../../utils/helpers";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") || 7;
  const queryDate = subDays(getToday({ end: true }), numDays).toISOString();

  const {
    data: bookings,
    isLoading,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${queryDate}`],
  });

  return { bookings, isLoading };
}

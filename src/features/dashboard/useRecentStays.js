import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { getToday } from "../../utils/helpers";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") || 7;
  const queryDate = subDays(getToday({ end: true }), numDays).toISOString();

  const {
    data: stays=[],
    isLoading,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${queryDate}`],
  });

  const confirmedStays = stays.filter((stay) => {
    return stay.status === "checked-in" || stay.status === "checked-out";
  });

  return { stays, confirmedStays, isLoading, numDays };
}

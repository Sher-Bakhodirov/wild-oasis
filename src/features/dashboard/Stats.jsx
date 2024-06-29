import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

export default function Stats({ bookings=[], confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const totalSales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0)
  const numCheckIns = confirmedStays.length;
  const occupation = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0)
  const availableOccupation = numDays * cabinCount;
  const occupancyRate = Math.round(occupation / availableOccupation * 100);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(totalSales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        color="indigo"
        value={numCheckIns}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        value={`${occupancyRate}%`}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

import Button from "../../ui/Button";
import { useCheckOut } from "../bookings/useBookings";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkOut } = useCheckOut();
  return (
    <Button variation="primary" size="small" disabled={isCheckingOut} onClick={() => checkOut(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;

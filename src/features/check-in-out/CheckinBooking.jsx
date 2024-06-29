import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking, useCheckIn } from "../bookings/useBookings";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkIn } = useCheckIn();
  const { bookingId: idFromUrl } = useParams();
  const { booking = {}, isLoading } = useBooking(idFromUrl);
  const { settings = {}, isLoadingSettings } = useSettings();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => {
    setConfirmPaid(Boolean(booking?.isPaid));
  }, [booking.isPaid]);

  useEffect(() => {
    setAddBreakfast(Boolean(booking?.hasBreakfast));
  }, [booking.hasBreakfast]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking) return <div>Not Found</div>;
  if (booking.status !== "unconfirmed") navigate(`/bookings/${idFromUrl}`);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  let optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    const breakfastObject = {
      hasBreakfast: true,
      extrasPrice: optionalBreakfastPrice,
      totalPrice: totalPrice + optionalBreakfastPrice,
    };
    checkIn({
      id: bookingId,
      breakfast: addBreakfast ? breakfastObject : {}
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            disabled={booking.hasBreakfast}
            onChange={(e) => {
              setAddBreakfast(e.target.checked);
              setConfirmPaid(false);
            }}
          >
            Include breakfast - {formatCurrency(Number(optionalBreakfastPrice))}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="isPaid"
          checked={confirmPaid}
          disabled={confirmPaid}
          onChange={(e) => setConfirmPaid(e.target.checked)}
        >
          I confirm {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice + Number(optionalBreakfastPrice))} (
          {formatCurrency(totalPrice)} +{" "}
          {formatCurrency(optionalBreakfastPrice)})
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

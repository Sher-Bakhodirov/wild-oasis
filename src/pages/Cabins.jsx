import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddEditCabin from "../features/cabins/AddEditCabin";
import Button from "../ui/Button";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
function Cabins() {
  
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations/>
      </Row>

      <Row>
        <CabinTable />
        <AddEditCabin>
          <Button>Add a new cabin</Button>
        </AddEditCabin>
      </Row>
    </>
  );
}

export default Cabins;

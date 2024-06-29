import useCabins from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  const sortParam = searchParams.get("sort_by") || "name-asc";
  const [sortValue, sortDirection] = sortParam.split("-");

  function sortAndFilterData(data) {
    return data
      .filter((cabin) => {
        if (filterValue === "with-discount" && cabin.discount === 0) return false;
        if (filterValue === "no-discount" && cabin.discount > 0) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortValue === "name") {
          return sortDirection === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        return sortDirection === "asc"
          ? a[sortValue] - b[sortValue]
          : b[sortValue] - a[sortValue];
      });
  }

  const sortedAndFilteredData = sortAndFilterData(cabins || []);

  if (isLoading) return <Spinner />;
  if (!cabins) return <Empty resourceName="Cabins"/>
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={sortedAndFilteredData}
          renderRow={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

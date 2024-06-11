import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinTableOperations() {
  const filterOptions = {
    filterKey: "discount",
    options: [
      {
        value: "all",
        label: "All",
      },
      {
        value: "no-discount",
        label: "No Discount",
      },
      {
        value: "with-discount",
        label: "With Discount",
      },
    ],
  };
  const sortOptions = [
    {
      value: "name-asc",
      label: "Sort by name (A-Z)",
    },
    {
      value: "name-desc",
      label: "Sort by name (Z-A)",
    },
    {
      value: "maxCapacity-asc",
      label: "Sort by capacity (low first)",
    },
    {
      value: "maxCapacity-desc",
      label: "Sort by capacity (high first)",
    },
    {
      value: "regularPrice-asc",
      label: "Sort by price (low first)",
    },
    {
      value: "regularPrice-desc",
      label: "Sort by price (high first)",
    },
    {
      value: "discount-asc",
      label: "Sort by discount (low first)",
    },
    {
      value: "discount-desc",
      label: "Sort by discount (high first)",
    },
  ];
  return (
    <TableOperations>
      <Filter {...filterOptions} />
      <SortBy options={sortOptions}/>
    </TableOperations>
  );
}

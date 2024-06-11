import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort_by") || options[0].value;
  function handleChange(e) {
    searchParams.set("sort_by", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <div>
      <Select type="white" options={options} value={sortValue} onChange={handleChange}/>
    </div>
  );
}

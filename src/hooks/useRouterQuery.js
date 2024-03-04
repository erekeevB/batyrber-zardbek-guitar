import { useSearchParams } from "react-router-dom";

export default function useGuitarListQuery() {
  let [searchParams, setSearchParams] = useSearchParams();

  return [
    {
      sort: searchParams.get("sort"),
      pageSize: searchParams.get("pageSize"),
      after: searchParams.get("after"),
    },
    (newValues) => {
      let oldValues = {};
      searchParams.forEach((value, key) => {
        oldValues[key] = value;
      });
      setSearchParams({ ...oldValues, ...newValues });
    },
  ];
}

import ReactPaginate from "react-paginate";
import GuitarItem from "../components/GuitarItem";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useGuitarListQuery from "../hooks/useRouterQuery";
import { fetchGuitarList } from "../axiosAPI";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

export default function GuitarListPage() {
  const [queryParams, setQueryParams] = useGuitarListQuery();
  const [itemOffset, setItemOffset] = useState(0);

  const { data, isFetching, error } = useQuery({
    queryKey: ["guitarList", queryParams],
    queryFn: () => fetchGuitarList(queryParams),
  });

  if (error) return "error" + error;

  const onChangeQueryValue = (e, queryParam) => {
    const newValue = e.target.value;
    setQueryParams({ [queryParam]: newValue });
  };
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * queryParams.pageSize) % data.data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="mainPage">
      <div className="mainPageHeader">
        <div className="mainPageHeaderTitle">Electric Guitars</div>
      </div>
      <div className="mainPageList container">
        <div className="mainPageListUpper">
          <select onChange={(e) => onChangeQueryValue(e, "pageSize")}>
            {PAGE_SIZE_VALUES.map((val) => (
              <option value={val} selected={val === queryParams.pageSize}>
                {val}
              </option>
            ))}
          </select>
          <select onChange={(e) => onChangeQueryValue(e, "sort")}>
            {SORT_VALUES.map((el) => (
              <option selected={el.value === queryParams.sort} value={el.value}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mainPageListInner">
          {isFetching
            ? Array(4)
                .fill(null)
                .map(() => <GuitarItem isFetching />)
            : data.data.guitarDTOList.map((el) => (
                <GuitarItem
                  id={el.id}
                  photoUrl={el.mediaUrl}
                  price={el.price}
                  title={el.name}
                  brand={el.brand}
                />
              ))}
        </div>
        {!isFetching && (
          <ReactPaginate
            breakLabel="..."
            previousLabel={<FaChevronLeft />}
            nextLabel={<FaChevronRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={data.data.pageCount}
            containerClassName={"paginationContainer"}
            pageClassName={"paginationItem"}
            previousClassName={"paginationItem"}
            nextClassName={"paginationItem"}
            activeLinkClassName={"active"}
          />
        )}
      </div>
    </div>
  );
}

const PAGE_SIZE_VALUES = [12, 30];

const SORT_VALUES = [
  { name: "Newest - Oldest", value: "time_asc" },
  { name: "Oldest - Newest", value: "time_desc" },
  { name: "Alphabetical A - Z", value: "alphabet_asc" },
  { name: "Alphabetical Z - A", value: "alphabet_desc" },
  { name: "Higher price - Lower price", value: "price_asc" },
  { name: "Lower price - Higher price", value: "price_desc" },
];

import React, { useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../store/slices/dataSlice";
import SearchInput from "./SearchInput";
const TableOutlet = () => {
  const { totalPage, currentPage, data } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [activeSearch, setActiveSearch] = React.useState(1);
  const handlePageClick = (e) => {
    dispatch(setCurrentPage(e.selected + 1));
    window.localStorage.setItem("currentPage", e.selected + 1);
  };
  return (
    <div>
      <h2>ТАБЛИЦА ЛЮДЕЙ</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="th" width={75}>
              №
            </th>
            <th>
              <div className="search">
                <span>Ф.И.О.</span>{" "}
                <SearchInput
                  onClickActive={(i) => setActiveSearch(i)}
                  index={1}
                  activeSearch={activeSearch}
                  searchValue="name"
                />
              </div>
            </th>
            <th className="th" width={200}>
              <div className="search">
                <span>Телефон номер</span>{" "}
                <SearchInput
                  onClickActive={(i) => setActiveSearch(i)}
                  index={2}
                  searchValue="phone"
                  activeSearch={activeSearch}
                />
              </div>
            </th>
            <th className="th" width={200}>
              <div className="search">
                <span>Город</span>{" "}
                <SearchInput
                  onClick={() => setActiveSearch(3)}
                  onClickActive={(i) => setActiveSearch(i)}
                  index={3}
                  searchValue="city"
                  activeSearch={activeSearch}
                />
              </div>
            </th>
            <th className="th" width={200}>
              Создан
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user, i) => (
              <tr key={user.id}>
                <td align="center">{(currentPage - 1) * 10 + i + 1}</td>
                <td>{user.name}</td>
                <td align="center">{user.phone}</td>
                <td align="center">{user.city}</td>
                <td align="center">
                  {new Date(user.created_at).toLocaleString("ru-RU", {
                    timeZone: "UTC",
                  })}
                </td>
              </tr>
            ))
          ) : (
            <td colSpan={5}>
              <h2>Упс! Похоже людей нет.</h2>
            </td>
          )}
        </tbody>
      </Table>
      <div className="pag">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={totalPage}
          forcePage={currentPage - 1}
          previousLabel="< "
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default TableOutlet;

import React, { useEffect } from "react";
import { useDeferredValue, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  setSearchWord,
  setSearchType,
  setCurrentPage,
} from "../store/slices/dataSlice";
import SearchImg from "../assets/images/search.svg";
const Search = ({ index, activeSearch, searchName, typeText }) => {
  const [text, setText] = useState("");
  const defferedValue = useDeferredValue(text);
  const dispatch = useDispatch();

  const onValueChange = (e) => {
    setText(e.target.value);
    dispatch(setSearchWord(`${defferedValue}`));
    dispatch(setSearchType(`${typeText}`));
    setCurrentPage(1);
  };

  const onClickReset = () => {
    // setText("");
    // dispatch(setSearchWord(``));
    // dispatch(setSearchType(``));
    // setCurrentPage(1);
  };

  return (
    <InputGroup className="input">
      <Form.Control
        value={text}
        placeholder={searchName}
        aria-label={searchName}
        aria-describedby="basic-addon1"
        onChange={onValueChange}
      />
      <img
        onClick={onValueChange}
        width={32}
        src={SearchImg}
        alt=""
      />
    </InputGroup>
  );
};

export default Search;

import React, { useDeferredValue } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import searchImg from "../assets/images/search.svg";
import closeImg from "../assets/images/close.svg";
import {
  setSearchWord,
  setSearchType,
  setCurrentPage,
} from "../store/slices/dataSlice";
const SearchInput = ({ index, searchValue, activeSearch, onClickActive }) => {
  const [isSearch, setIsSearch] = React.useState(false);
  const [isReset, setIsReset] = React.useState(false);
  const [text, setText] = React.useState("");
  const defferedValue = useDeferredValue(text);
  const dispatch = useDispatch();

  const onClickSearch = (e) => {
    dispatch(setSearchType(`${searchValue}`));
    dispatch(setSearchWord(`${defferedValue}`));
    dispatch(setCurrentPage(1));
    setIsSearch(!isSearch);
    setText("");
  };

  const onActive = () => {
    onClickActive(index);
    setText("");
    setIsSearch(!isSearch);
    setIsReset(true);
  };

  const onClickReset = () => {
    setIsReset(false);
    setIsSearch(false);
    dispatch(setSearchType(``));
    dispatch(setSearchWord(``));
  };
  return (
    <>
      <div className="search__icon">
        {isReset && activeSearch === index ? (
          <img onClick={onClickReset} width={24} src={closeImg} alt="" />
        ) : (
          <img onClick={onActive} width={24} src={searchImg} alt="" />
        )}
      </div>
      {index === activeSearch && (
        <div className={isSearch ? `search__item active` : `search__item `}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
          />
          <div className="search__buttons">
            <Button onClick={onClickSearch} variant="primary">
              Search
            </Button>
            <Button onClick={onClickReset} variant="secondary">
              Reset
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchInput;

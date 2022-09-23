import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/slices/dataSlice";
import tableImg from "../assets/images/table.svg";
import roundImg from "../assets/images/round.svg";
import infoImg from "../assets/images/info.svg";
const Home = () => {
  const dispatch = useDispatch();
  const { currentPage, searchWord, searchType } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    const search = searchWord.length > 1 ? `&${searchType}=${searchWord}` : "";
    const params = `?page=${currentPage}${search}`;
    dispatch(fetchData(params));
  }, [currentPage, searchWord]);
  console.log(currentPage);
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="aside" sm={1} md={1} lg={3} xl={2}>
            <h2>Admin Panel</h2>
            <ul>
              <li>
                <Link to="/">
                  <img src={tableImg} alt="" /> <span>Таблица людей</span>
                </Link>
              </li>
              <li>
                <Link to="/stats">
                  <img src={roundImg} alt="" /> <span>Статистика</span>
                </Link>
              </li>
              <li>
                <Link to="/info">
                  <img src={infoImg} alt="" /> <span>Инфография</span>
                </Link>
              </li>
            </ul>
          </Col>
          <Col className="info" sm={11} md={11} lg={9} xl={10}>
            <Row>
              <Header />
            </Row>
            <Row className="pt-5">
              <Outlet />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

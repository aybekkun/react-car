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
import downloadImg from "../assets/images/download.svg";
import axios from "../axios";
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

  const onClickDownload = async () => {
    await axios({
      url: '/export',
      method: 'POST',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.xlsx');
      document.body.appendChild(link);
      link.click();
    });
  };

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
              <li onClick={onClickDownload} className="download">
                <img src={downloadImg} alt="" /> <span>Скачать таблицу</span>
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

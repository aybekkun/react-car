import React from "react";
import { useEffect } from "react";
import { Col, Row, Tooltip } from "react-bootstrap";
import { Funnel, FunnelChart, LabelList, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfoData } from "../store/slices/infoSlice";
const InfoOutlet = () => {
  const dispatch = useDispatch();
  const { voronka } = useSelector((state) => state.info);
  useEffect(() => {
    dispatch(fetchInfoData());
  }, []);

  const voronkaData = [
    {
      value: voronka.start,
      name: "Start basqanlar",
      fill: "#82ca9d",
    },
    {
      value: voronka.signed,
      name: "Dizimnen ótkenler",
      fill: "#FF8042",
    },
    {
      value: voronka.group,
      name: "Gruppaǵa aǵza bolǵanlar",
      fill: "#8dd1e1",
    },
  ];

  return (
    <div>
      <h2>Инфография</h2>
      <Row>
        <Col md={8} lg={6} style={{ minHeight: "300px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart width={730} height={250}>
              <Tooltip />
              <Funnel dataKey="value" data={voronkaData} isAnimationActive>
                <LabelList
                  position="right"
                  fill="#000"
                  stroke="none"
                  dataKey="name"
                />
                <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </Col>
        <Col md={4} lg={6}>
          <div className="vor">
            <div className="vor__info">
              <span style={{ backgroundColor: "#82CA9D" }}></span>
              <p>Start basqanlar - {voronka.start}</p>
            </div>
            <div className="vor__info">
              <span style={{ backgroundColor: "#FF8042" }}></span>
              <p>Dizimnen ótkenler - {voronka.signed}</p>
            </div>
            <div className="vor__info">
              <span style={{ backgroundColor: "#8dd1e1" }}></span>
              <p>Gruppaǵa aǵza bolǵanlar - {voronka.group}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default InfoOutlet;

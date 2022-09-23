import React from "react";
import { useEffect } from "react";
import { Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfoData } from "../store/slices/infoSlice";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const StatsOutlet = () => {
  const dispatch = useDispatch();
  const { infoData } = useSelector((state) => state.info);

  useEffect(() => {
    dispatch(fetchInfoData());

  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#FF9D9C","#30B470"];
  return (
    <>
    <h2>Статистика</h2>
      <Col  md={8} lg={6} xl={4}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={infoData}

            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
           
          >
            {infoData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
          
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </ResponsiveContainer>
      </Col>
      <Col  md={4} lg={6} xl={8}>
      <Table size="sm"  striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Город</th>
                <th>Пользователи</th>
              </tr>
            </thead>
            <tbody>
              {infoData.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.users}</td>
                </tr>
              ))}
            </tbody>
          </Table>

      </Col>
    </>
  );
};

export default StatsOutlet;

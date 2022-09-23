import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "./axios";
import { setIsAuth } from "./store/slices/userSlice";
import TableOutlet from "./components/TableOutlet";
import StatsOutlet from "./components/StatsOutlet";
import InfoOutlet from "./components/InfoOutlet";
function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`/leads?page=1&p=1`).then((res) => {
      dispatch(setIsAuth(true));
    });
  }, []);
  return (
    <div className="App">
      <Routes>
        {isAuth ? (
          <Route path="/" element={<Home />}>
            <Route path="/" element={<TableOutlet />} />
            <Route path="/stats" element={<StatsOutlet />} />
            <Route path="/info" element={<InfoOutlet />} />
          </Route>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </div>
  );
}

export default App;

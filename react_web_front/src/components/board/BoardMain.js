import { Route, Routes } from "react-router-dom";
import BoardList from "./BoardList";
import "./board.css";
import BoardWrite from "./BoardWrite";
import BoardView from "./BoardView";

const BoardMain = () => {
  return (
    <Routes>
      <Route path="list" element={<BoardList />} />
      <Route path="write" element={<BoardWrite />} />
      <Route path="view/:boardNo" element={<BoardView />} />
    </Routes>
  );
};

export default BoardMain;

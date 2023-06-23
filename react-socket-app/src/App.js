import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";


function App() {  

  return (
    <div >

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/:roomId" element={<RoomPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

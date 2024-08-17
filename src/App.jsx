import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import './App.css';
import Player from './pages/Player';
import Movies from "./pages/Movies";
import TVShows from './pages/TVShows';
import UserLiked from "./pages/UserLiked";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login></Login>} />
        <Route exact path="/signup" element={<Signup></Signup>} />
        <Route exact path="/player" element={<Player></Player>} />
        <Route exact path='/movies' element={<Movies></Movies>}></Route>
        <Route exact path='/tv' element={<TVShows></TVShows>}></Route>
        <Route exact path='/mylist' element={<UserLiked></UserLiked>}></Route>
        <Route exact path="/" element={<Netflix></Netflix>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
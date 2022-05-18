import React from "@testing-library/react"
import './App.css';
import Header from "./component/Header"
import NavBar from "./component/NavBar"
import Home from "./component/Home"
import Footer from "./component/Footer"
import Transfer from "./component/Transfer"
import Register from "./component/Register"
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
     {/* <Transfer/> */}
    <Router>
<Routes>
  <Route  index element={<Home/>}/>
  <Route path="/Register" element={<Register/>}/>
  <Route path="/Transfer" element={<Transfer/>}/>
</Routes>
    </Router>
      <Footer/>
      </div>
  );
}

export default App;

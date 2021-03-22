import React from "react";

import Nav from "./compoments/Nav";
import Footer from "./compoments/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import {Switch,Route} from "react-router-dom";
import "./styles/style.css";
function App() {
  return (
    <div className="App">
      <Nav />
      <switch> 
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
      </switch>

      <Footer />
    </div>
  );
}

export default App;

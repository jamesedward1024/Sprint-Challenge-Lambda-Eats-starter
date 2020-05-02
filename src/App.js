import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import HomePage from "./Components/HomePage";
import PizzaForm from "./Components/PizzaForm";
import "./App.css"

const App = () => {
  return (
    <div className="header">
      <nav className="navigation">
        <h1>Lambda Eats</h1>
        <Link to="/" className="links">Home</Link>
        <Link to="/pizza" className="links">Order Now</Link>
      </nav>
      <Switch>
        <Route path="/pizza" component={PizzaForm}/>
        <Route path="/" component={HomePage}/>
      </Switch>
    </div>
  );
};
export default App;

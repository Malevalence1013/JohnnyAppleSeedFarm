import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// page components
import Home from "./pages/Home/home";
import PickYourOwn from "./pages/Pick Your Own/PickYourOwn";
import FarmMarkets from "./pages/Farm Markets/FarmMarkets";
import Recipes from "./pages/recipes";
import Header from "./Header/header";
import Footer from "./Footer/footer";

// component used for react router, add new page links here
const Main = () => (
  <Router>
    <div id="wrapper">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/PickYourOwn" component={PickYourOwn} />
      <Route path="/FarmMarkets" component={FarmMarkets} />
      <Route path="/recipes" component={Recipes} />
      <Footer />
    </div>
  </Router>
);

export default Main;

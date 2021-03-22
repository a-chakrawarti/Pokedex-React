import React from "react";
import PokeList from "./PokeList";
import PokeInfo from "./PokeInfo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Body = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={PokeList}></Route>
          <Route path="/pokemon/:id" component={PokeInfo}></Route>
        </Switch>
      </Router>
    </>
  );
};

export default Body;

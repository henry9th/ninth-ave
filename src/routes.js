import React from "react";
import { Route } from "react-router-dom";
import  HomePage  from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/i/:brand/:itemName" exact component={ItemPage} />
    </div>
  )
}

export default Routes
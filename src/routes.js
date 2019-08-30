import React from "react";
import { Route } from "react-router-dom";
import  HomePage  from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import SellerPage from "./pages/SellerPage";

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/i/:seller/:itemName" exact component={ItemPage} />
      <Route path="/s/:seller" exact component={SellerPage} />
    </div>
  )
}

export default Routes
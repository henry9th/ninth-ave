import React from "react";
import { Route } from "react-router-dom";
import  HomePage  from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";
import SellerPage from "./pages/SellerPage";
import OwnerPage from "./pages/OwnerPage";
import EditItemPage from './pages/EditItemPage';
import WebMagPage from './pages/WebMagPage';

const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/i/:seller/:itemName" exact component={ItemPage} />
      <Route path="/s/:seller" exact component={SellerPage} />
      <Route path="/webmag" component={WebMagPage} /> 
      <Route path="/owners" component={OwnerPage} /> 
      <Route path="/owners/i/:itemId" component={EditItemPage} /> 

    </div>
  )
}

export default Routes
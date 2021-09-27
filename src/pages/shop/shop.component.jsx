import React, { useEffect } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";

import { useDispatch } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import CollectionPageContainer from "../collection/collection.container";

const ShopPage = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  return (
    <div className="shop-page">
      <Route exact path={`${path}`} component={CollectionsOverviewContainer} />
      <Route
        path={`${path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

export default ShopPage;

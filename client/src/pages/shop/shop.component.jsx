import React, { useEffect, lazy, Suspense } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import Spinner from "../../components/spinner/spinner.component";

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

const ShopPage = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

export default ShopPage;

import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';

import BlankLayout from "../layouts/BlankLayout";
import HomeLayout from '../layouts/HomeLayout';

// const SuspenseComponent = Component => props => {
//   return (
//     <Suspense fallback={null}>
//       <Component {...props}></Component>
//     </Suspense>
//   )
// }
// const RecommendComponent = lazy(() => import("../application/Recommend/"));

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      {
        path: "/recommend",
        component: Recommend
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
]
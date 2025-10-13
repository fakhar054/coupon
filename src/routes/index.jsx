// import { lazy, Suspense } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import App from "./../App";
// import HomePage from "../pages/HomePage";
// import BrandPage from "../pages/BrandPage";
// import CategoryPage from "../pages/CategoryPage";
// import StorePage from "../pages/StorePage";
// import CategoryCouponPage from "../pages/CategoryCouponPage";
// import ContactUsPage from "../pages/ContactUsPage";
// import AboutUsPage from "../pages/AboutUsPage.jsx";
// import PrivacyPolicy from "../Components/Privacy/Policy.jsx";
// import TermsCondition from "../Components/TermsandCondition/TermsCondition.jsx";
// import CustomPage from "../pages/CustomPage.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <HomePage />,
//       },
//       {
//         path: "gutscheine/:brandName",
//         element: <BrandPage />,
//         loader: ({ params }) => {
//           return params.brandName;
//         },
//       },
//       {
//         path: "kategorie/",
//         element: <CategoryPage />,
//       },

//       {
//         path: "gutscheine/",
//         element: <StorePage />,
//         loader: ({ request }) => {
//           const url = new URL(request.url);
//           const category = url.searchParams.get("kategorie");
//           const search = url.searchParams.get("search");
//           return { search, category };
//         },
//       },
//       {
//         path: "categorycoupon",
//         element: <CategoryCouponPage />,
//         loader: ({ request }) => {
//           const url = new URL(request.url);
//           const category = url.searchParams.get("category");
//           const store = url.searchParams.get("store");
//           const search = url.searchParams.get("search");
//           const highlight = url.searchParams.get("highlight");
//           return { category, store, search, highlight }; // pass these to the component as needed
//         },
//       },
//       {
//         path: "kontaktierensieuns/",
//         element: <ContactUsPage />,
//       },
//       {
//         path: "überuns/",
//         element: <AboutUsPage />,
//       },
//       {
//         path: "Datenschutzerklärung/",
//         element: <PrivacyPolicy />,
//       },
//       {
//         path: "allgemeinegeschäftsbedingungen/",
//         element: <TermsCondition />,
//       },

//       {
//         path: "Seite/:slug/",
//         element: <CustomPage />,
//       },
//     ],
//   },
// ]);

// export default router;

import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import HomePage from "../pages/HomePage";
const BrandPage = lazy(() => import("../pages/BrandPage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const StorePage = lazy(() => import("../pages/StorePage"));
const CategoryCouponPage = lazy(() => import("../pages/CategoryCouponPage"));
const ContactUsPage = lazy(() => import("../pages/ContactUsPage"));
const AboutUsPage = lazy(() => import("../pages/AboutUsPage.jsx"));
const PrivacyPolicy = lazy(() => import("../Components/Privacy/Policy.jsx"));
const TermsCondition = lazy(() =>
  import("../Components/TermsandCondition/TermsCondition.jsx")
);
const CustomPage = lazy(() => import("../pages/CustomPage.jsx"));

const Loader = () => <div className="page-loader">Loading...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },

      {
        path: "gutscheine/:brandName",
        element: (
          <Suspense fallback={<Loader />}>
            <BrandPage />
          </Suspense>
        ),
        loader: ({ params }) => params.brandName,
      },
      {
        path: "kategorie/",
        element: (
          <Suspense fallback={<Loader />}>
            <CategoryPage />
          </Suspense>
        ),
      },
      {
        path: "gutscheine/",
        element: (
          <Suspense fallback={<Loader />}>
            <StorePage />
          </Suspense>
        ),
        loader: ({ request }) => {
          const url = new URL(request.url);
          const category = url.searchParams.get("kategorie");
          const search = url.searchParams.get("search");
          return { search, category };
        },
      },
      {
        path: "categorycoupon",
        element: (
          <Suspense fallback={<Loader />}>
            <CategoryCouponPage />
          </Suspense>
        ),
      },
      {
        path: "kontaktierensieuns/",
        element: (
          <Suspense fallback={<Loader />}>
            <ContactUsPage />
          </Suspense>
        ),
      },
      {
        path: "überuns/",
        element: (
          <Suspense fallback={<Loader />}>
            <AboutUsPage />
          </Suspense>
        ),
      },
      {
        path: "Datenschutzerklärung/",
        element: (
          <Suspense fallback={<Loader />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "allgemeinegeschäftsbedingungen/",
        element: (
          <Suspense fallback={<Loader />}>
            <TermsCondition />
          </Suspense>
        ),
      },
      {
        path: "Seite/:slug/",
        element: (
          <Suspense fallback={<Loader />}>
            <CustomPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;



import { createBrowserRouter} from "react-router-dom";
import App from "./../App"
import HomePage from "../pages/HomePage";
import BrandPage from "../pages/BrandPage";
import CategoryPage from "../pages/CategoryPage";
import StorePage from "../pages/StorePage";
import CategoryCouponPage from "../pages/CategoryCouponPage";
import ContactUsPage from "../pages/ContactUsPage";
import AboutUsPage from "../pages/AboutUsPage.jsx"
import PrivacyPolicy from "../Components/Privacy/Policy.jsx";
import TermsCondition from "../Components/TermsandCondition/TermsCondition.jsx";
import CustomPage from "../pages/CustomPage.jsx";


const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',element:<HomePage />
            },
            {
                path: 'gutscheine/:brandName',
                element: <BrandPage/>,
                loader: ({params}) => {
                    return params.brandName;
                }
            },
            {
                path:'kategorie/',
                element: <CategoryPage/>,
 
            },

            {
                path: 'gutscheine/',
                element: <StorePage />,
                loader: ({ request }) => {
                  const url = new URL(request.url);
                  const category = url.searchParams.get('kategorie'); 
                  const search = url.searchParams.get('search'); 
                  return { search, category }; 
                },
              },
            {
                path: 'categorycoupon',  
                element: <CategoryCouponPage />,
                loader: ({ request }) => {
                    const url = new URL(request.url);
                    const category = url.searchParams.get('category');
                    const store = url.searchParams.get('store');
                    const search = url.searchParams.get('search');
                    const highlight = url.searchParams.get('highlight');
                    return { category, store, search, highlight}; // pass these to the component as needed
                },
            },
            {
                path: 'kontaktierensieuns/',
                element: <ContactUsPage/>,

            },
            {
                path: 'überuns/',
                element: <AboutUsPage/>,

            },
            {
                path: 'Datenschutzerklärung/',
                element: <PrivacyPolicy/>,

            },
            {
                path: 'allgemeinegeschäftsbedingungen/',
                element: <TermsCondition/>,

            },

            {
                path: 'Seite/:slug/',
                element: <CustomPage/>,

            },


        ]
    }
]);

export default router;
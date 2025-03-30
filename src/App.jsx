import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Services from "./pages/Services";
import Rental from "./pages/Rental";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/Confirmation";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./components/NotFound";
import RootLayout from "./layouts/RootLayout";
import Error from "./components/Error";
import LoginLayout from "./layouts/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="rental" element={<Rental />} />
        <Route path="about" element={<About />} />

        {/* Authenticated Routes */}
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/confirmation" element={<OrderConfirmation />} />
        <Route path="profile" element={<Profile />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
      
      {/* Auth Routes */}
      <Route path="login" element={<LoginLayout />} />
      <Route path="register" element={<RegisterLayout />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { People } from "./pages/people";
import { Navbar } from "./components/navbar";
import { Profile } from "./pages/profile";
import { OtherUserProfile } from "./profileComponents/otheruserprofile";
import { Product } from "./pages/product";
import UpdateProductDetails from "./pages/updateProductDetailsAndImages";
import ScrollToTopButton from "./components/ScrollToTop";
import { Articles } from "./pages/AllArticles";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/people/:Userid" element={<OtherUserProfile />} />
          <Route path="/product/:productID" element={<Product />} />
          <Route
            path="/product/updateDetails/:productID"
            element={<UpdateProductDetails />}
          />
          <Route path="/articles" element={<Articles />} />
        </Routes>
        <ScrollToTopButton />
      </Router>
    </div>
  );
}

export default App;

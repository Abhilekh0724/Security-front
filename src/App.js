import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./homepage/Homepage";
import Loginpage from "./pages/login/Loginpage";
import Registerpage from "./pages/register/Registerpage";
import Navbar from "./components/Navbar";
import Profile from "./pages/profile/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchResults from "./pages/search/searchpage";
import AdminCategoryDashboard from "./pages/admin/AdminCategory";
import CategoryDetail from "./pages/category/CategoryDetail";
import AdminCategoryList from "./pages/admin/AdminPanel";
import Book from "./pages/book/Book";
import AdminBooked from "./pages/admin/AdminBooked";
import PaymentPage from "./pages/payment/Payment";
import ExploreVenues from "./pages/venues/ExploreVenues";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROLES } from "./config/roles";
import HelmetConfig from "./components/HelmetConfig";
import { HelmetProvider } from 'react-helmet-async';
import { NavigationProvider } from './context/NavigationContext';
import LoadingSpinner from './components/LoadingSpinner';
import { useNavigation } from './context/NavigationContext';

const AppContent = () => {
  const { isLoading } = useNavigation();

  return (
    <>
      <HelmetConfig />
      <Navbar />
      <ToastContainer />
      {isLoading && <LoadingSpinner />}
      <Routes>
        {/* Redirect root to homepage */}
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searchpage" element={<SearchResults />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoute requiredRole={ROLES.ADMIN}>
              <AdminCategoryDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/list"
          element={
            <ProtectedRoute requiredRole={ROLES.ADMIN}>
              <AdminCategoryList />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/book/bookeduser" element={<Book />} />
        <Route path="/book/adminbook" element={<AdminBooked />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/explore-venues" element={<ExploreVenues />} />
        {/* Catch all route - redirect to homepage */}
        <Route path="*" element={<Navigate to="/homepage" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;

import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Admission from "./pages/Admission";
import Fees from "./pages/Fees";
import Login from "./admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./admin/Dashboard";
import Inquiries from "./admin/Inquiries";
import Admissions from "./admin/Admissions";
import BlogsAdmin from "./admin/BlogsAdmin";
import GalleryAdmin from "./admin/GalleryAdmin";
import FeesAdmin from "./admin/FeesAdmin";


function App() {
  const location = useLocation();

  // Check if route is admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Hide Navbar on admin */}
      {!isAdminRoute && <Navbar />}

      <div className="min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/fees" element={<Fees />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inquiries"
            element={
              <ProtectedRoute>
                <Inquiries />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/admissions"
            element={
              <ProtectedRoute>
                <Admissions />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <BlogsAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <GalleryAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/fees"
            element={
              <ProtectedRoute>
                <FeesAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Hide Footer on admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;

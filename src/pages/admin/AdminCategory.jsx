import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCategoryApi } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faList, 
  faCalendarCheck, 
  faChartLine,
  faPlus,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateCategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    price: "",
    name: "",
    info: "",
    photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCategoryData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("price", categoryData.price);
    formData.append("name", categoryData.name);
    formData.append("info", categoryData.info);
    if (categoryData.photo) {
      formData.append("photo", categoryData.photo);
    }

    try {
      const response = await createCategoryApi(formData);
      if (response.data.success) {
        toast.success("Category created successfully");
        navigate("/admin/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error creating category");
    }
  };

  const handleAdminPanel = () => {
    navigate("/admin/list");
  };

  const handleAdminBooked = () => {
    navigate("/book/adminbook");
  };

  const handleAdminLogs = () => {
    navigate("/admin/logs");
  };

  return (
    <div className="admin-container">
      {/* Admin Header */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your venue categories and monitor system activities</p>
      </div>

      <div className="container py-4">
        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-md-3">
            <div className="admin-sidebar">
              <div className="nav-item active" onClick={() => navigate('/admin/category')}>
                <FontAwesomeIcon icon={faPlus} />
                <span>Create Category</span>
              </div>
              <div className="nav-item" onClick={handleAdminPanel}>
                <FontAwesomeIcon icon={faTachometerAlt} />
                <span>Category List</span>
              </div>
              <div className="nav-item" onClick={handleAdminBooked}>
                <FontAwesomeIcon icon={faCalendarCheck} />
                <span>Bookings</span>
              </div>
              <div className="nav-item" onClick={handleAdminLogs}>
                <FontAwesomeIcon icon={faChartLine} />
                <span>User Logs</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-gradient text-white">
                <h2 className="mb-0">Create New Category</h2>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={categoryData.price}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      name="name"
                      value={categoryData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter category name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Information</label>
                    <textarea
                      name="info"
                      value={categoryData.info}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter information"
                      required
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Photo</label>
                    <input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Create Category
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .admin-header {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          padding: 2rem 0;
          text-align: center;
          margin-bottom: 2rem;
        }

        .admin-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .admin-header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .admin-sidebar {
          background: white;
          border-radius: 10px;
          padding: 1rem;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        .nav-item {
          padding: 1rem;
          margin: 0.5rem 0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-item:hover {
          background: #f8f9fa;
          transform: translateX(5px);
        }

        .nav-item.active {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
        }

        .nav-item svg {
          width: 20px;
        }

        .card {
          border-radius: 15px;
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          padding: 1.5rem;
        }

        .form-control {
          border-radius: 8px;
          padding: 0.8rem;
          border: 1px solid #e0e0e0;
        }

        .form-control:focus {
          border-color: #6a11cb;
          box-shadow: 0 0 0 0.2rem rgba(106, 17, 203, 0.25);
        }

        .form-label {
          font-weight: 500;
          color: #444;
          margin-bottom: 0.5rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          border: none;
          padding: 0.8rem;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
        }
      `}</style>
    </div>
  );
};

export default CreateCategoryForm;

import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCategoryApi } from "../../api/Api";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-success text-white text-center">
              <h2 className="mb-0">Create Category</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div className="mb-3">
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
                <div className="mb-3">
                  <label className="form-label">Photo</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">Save</button>
                <button type="button" className="btn btn-primary w-100 mt-3" onClick={handleAdminPanel}>Go to Admin Panel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          background-color: #f1f4f9;
          padding: 50px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .card {
          border-radius: 15px;
        }

        .card-header {
          border-radius: 15px 15px 0 0;
        }

        .btn {
          border-radius: 50px;
          transition: background-color 0.3s ease;
        }

        .btn-success:hover {
          background-color: #218838;
        }

        .btn-primary:hover {
          background-color: #0069d9;
        }

        .form-label {
          font-weight: bold;
        }

        .form-control {
          border-radius: 50px;
        }
      `}</style>
    </div>
  );
};

export default CreateCategoryForm;

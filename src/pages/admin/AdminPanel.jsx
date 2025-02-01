import React, { useEffect, useState } from "react";
import {
  getCategoriesApi,
  deleteCategoryApi,
  updateCategoryApi,
} from "../../api/Api"; // Update the path to your actual api.js location
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategoriesApi();
      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        console.error("Failed to fetch categories:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteCategoryApi(id);
      if (response.data.success) {
        toast.success('Category deleted successfully');
        fetchCategories(); // Refresh the list
      } else {
        toast.error('Failed to delete category');
      }
    } catch (error) {
      toast.error('Error deleting category');
    }
  };

  const handleUpdate = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setInfo(category.info);
    setPhoto(null);
  };

  const handleUpdateSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('info', info);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await updateCategoryApi(editingCategory._id, formData);
      if (response.data.success) {
        toast.success('Category updated successfully');
        setEditingCategory(null);
        fetchCategories(); // Refresh the list
      } else {
        toast.error('Failed to update category');
      }
    } catch (error) {
      toast.error('Error updating category');
    }
  };

  const handleBack = () => {
    navigate('/admin/category');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className="btn btn-outline-primary back-button"
          onClick={handleBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Admin Panel
        </button>
        <h2 className="mb-0">Category List</h2>
      </div>

      {editingCategory && (
        <div className="edit-form mb-4">
          <h3>Update Category</h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control mb-3"
          />
          <textarea
            placeholder="Information"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="form-control mb-3"
          />
          <div className="d-flex gap-2">
            <button onClick={handleUpdateSubmit} className="btn btn-success">Submit</button>
            <button onClick={() => setEditingCategory(null)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Information</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.info}</td>
                <td>
                  <img
                    src={`https://localhost:5500${category.photo}`}
                    alt={category.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>
                  <button onClick={() => handleUpdate(category)} className="btn btn-primary btn-sm me-2">Update</button>
                  <button onClick={() => handleDelete(category._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .back-button {
          padding: 8px 20px;
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          transform: translateX(-5px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .edit-form {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        .table-responsive {
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .table th {
          background-color: #343a40;
          color: white;
          border: none;
        }

        .btn-sm {
          border-radius: 20px;
          padding: 5px 15px;
        }
      `}</style>
    </div>
  );
};

export default AdminCategoryList;

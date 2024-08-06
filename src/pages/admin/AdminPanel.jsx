import React, { useEffect, useState } from "react";
import {
  getCategoriesApi,
  deleteCategoryApi,
  updateCategoryApi,
} from "../../api/Api"; // Update the path to your actual api.js location
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [photo, setPhoto] = useState(null);

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

  return (
    <div className="container">
      <h2>Admin Category List</h2>
      {editingCategory && (
        <div className="edit-form">
          <h3>Update Category</h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Information"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <button onClick={handleUpdateSubmit}>Submit</button>
          <button onClick={() => setEditingCategory(null)}>Cancel</button>
        </div>
      )}
      <table className="table mt-2">
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
                  src={`http://localhost:5500${category.photo}`}
                  alt={category.name}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(category)}>Update</button>
                <button onClick={() => handleDelete(category._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .edit-form {
          margin-bottom: 20px;
        }

        .edit-form input,
        .edit-form textarea {
          display: block;
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .edit-form button {
          padding: 10px 20px;
          background-color: #e91e63;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 10px;
        }

        .edit-form button:hover {
          background-color: #d81b60;
        }
      `}</style>
    </div>
  );
};

export default AdminCategoryList;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminCategoryDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // Fetch categories from the API
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    // Simulating an API call
    const categoriesData = [
      { _id: "1", name: "Venue" },
      { _id: "2", name: "Photographer" },
      { _id: "3", name: "Makeup Artist" },
      { _id: "4", name: "Celebration Halls" },
    ];
    setCategories(categoriesData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = { _id: Date.now().toString(), name: categoryName };
    setCategories([...categories, newCategory]);
    setCategoryName("");
    toast.success("Category added successfully");
  };

  return (
    <div className="container">
      <h2>Admin Category Dashboard</h2>
      <div className="d-flex justify-content-between mt-2">
        <form onSubmit={handleSubmit}>
          <label>Category Name</label>
          <input
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Category Name"
            value={categoryName}
            required
          />
          <button type="submit" className="btn btn-primary mt-2">
            Add Category
          </button>
        </form>
      </div>

      <table className="table mt-2">
        <thead className="table-dark">
          <tr>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryDashboard;

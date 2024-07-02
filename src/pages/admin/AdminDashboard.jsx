import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminCategoryDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    const categoriesData = [
      { _id: "1", name: "Venue" },
      { _id: "2", name: "Photographer" },
      { _id: "3", name: "Makeup Artist" },
      { _id: "4", name: "Celebration Halls" },
    ];
    setCategories(categoriesData);
  };

  const handleCategoryDataChange = (categoryId, field, value) => {
    setCategoryData((prevData) => ({
      ...prevData,
      [categoryId]: {
        ...prevData[categoryId],
        [field]: value,
      },
    }));
  };

  const handleCategoryFormSubmit = (e, categoryId) => {
    e.preventDefault();
    const data = categoryData[categoryId];
    // Perform the API call to save the data
    toast.success(`${categories.find((cat) => cat._id === categoryId).name} data saved successfully`);
  };

  return (
    <div className="container">
      <h2>Admin Category Dashboard</h2>

      <table className="table mt-2">
        <thead className="table-dark">
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-info"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseForm-${category._id}`}
                  aria-expanded="false"
                  aria-controls={`collapseForm-${category._id}`}
                >
                  Add Info
                </button>
                <div className="collapse mt-2" id={`collapseForm-${category._id}`}>
                  <form onSubmit={(e) => handleCategoryFormSubmit(e, category._id)}>
                    <label>Information</label>
                    <textarea
                      onChange={(e) => handleCategoryDataChange(category._id, "info", e.target.value)}
                      className="form-control"
                      value={categoryData[category._id]?.info || ""}
                      placeholder="Enter information"
                      required
                    ></textarea>
                    <label className="mt-2">Photo</label>
                    <input
                      onChange={(e) => handleCategoryDataChange(category._id, "photo", e.target.files[0])}
                      type="file"
                      className="form-control"
                    />
                    <button type="submit" className="btn btn-success mt-2">
                      Save
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryDashboard;

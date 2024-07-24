import React, { useEffect, useState } from "react";
import { getCategoriesApi } from "../../api/Api"; // Update the path to your actual api.js location

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategoriesApi(); // Use the getCategoriesApi function
      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        console.error("Failed to fetch categories:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Category List</h2>
      <table className="table mt-2">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Information</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.info}</td>
              <td>
                <img src={`http://localhost:5500${category.photo}`} alt={category.name} style={{ maxWidth: "100px", maxHeight: "100px" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryList;

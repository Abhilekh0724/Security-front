import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCategoryApi } from "../../api/Api"; // Ensure this path is correct

const CreateCategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    info: "",
    photo: null,
  });

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
    formData.append("name", categoryData.name);
    formData.append("info", categoryData.info);
    if (categoryData.photo) {
      formData.append("photo", categoryData.photo);
    }

    try {
      const response = await createCategoryApi(formData);
      if (response.data.success) {
        toast.success("Category created successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error creating category");
    }
  };

  return (
    <div className="container">
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-success">Save</button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;

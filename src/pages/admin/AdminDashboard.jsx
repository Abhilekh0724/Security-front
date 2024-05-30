import React, { useState } from "react";

const AdminDashboard = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // image state
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // function to upload and preview image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      productName,
      productPrice,
      productCategory,
      productDescription,
      productImage
    );

    // form data preparation
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImage", previewImage);

    // API call commented out
    // createProductApi(formData);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-2">
        <h2>Admin Dashboard</h2>
      </div>
      <table className="table mt-2">
        <thead className="table-dark">
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Product Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="http://picsum.photos/50" alt="" />
            </td>
            <td>Flower</td>
            <td>122</td>
            <td>Flower for you</td>
            <td>Flower</td>
            <td>
              <div className="btn-group" role="group">
                <button className="btn btn-success">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

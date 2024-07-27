import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryByIdApi } from "../../api/Api";// Ensure this path is correct
import { toast } from "react-toastify";

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryByIdApi(id);
        if (response.data.success) {
          setCategory(response.data.category);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching category");
      }
    };

    fetchCategory();
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>{category.name}</h2>
      <img src={`http://localhost:5500${category.photo}`} alt={category.name} style={{ width: '100%', height: 'auto' }} />
      <p>{category.info}</p>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>${category.price}</p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        BOOK
      </button>
    </div>
  );
};

export default CategoryDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryByIdApi } from '../../api/Api';// Ensure this path is correct
import { toast } from 'react-toastify';

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
        toast.error('Error fetching category');
      }
    };

    fetchCategory();
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{category.name}</h1>
      <p>{category.info}</p>
      {category.photo && <img src={`http://localhost:5500${category.photo}`} alt={category.name} style={{ maxWidth: '200px' }} />}
      <p>Price: ${category.price}</p>
    </div>
  );
};

export default CategoryDetail;

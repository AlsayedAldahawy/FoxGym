import { useState, useEffect } from 'react';

const useFetchData = () => {
  const [payment, setPayment] = useState(null);
  const [packages, setPackages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await fetch("http://localhost:5000/payment");
        if (!response.ok) {
          throw new Error("Failed to fetch payment data");
        }
        const data = await response.json();
        setPayment(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages data");
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchData = async () => {
      await fetchPayment();
      await fetchPackages();
      setLoading(false);
    };

    fetchData();
  }, []);

  return { payment, packages, loading, error };
};

export default useFetchData;

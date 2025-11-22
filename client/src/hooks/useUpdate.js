import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useUpdate = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const put = async (body = {}, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(body),
        ...options,
      });


      // means token expired or wrong role accessing 
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        navigate('/login')
        return
      }



      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();
      
      setData(json);
      return json;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { put, data, loading, error };
};

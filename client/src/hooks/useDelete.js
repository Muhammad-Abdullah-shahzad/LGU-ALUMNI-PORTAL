import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useDelete = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const remove = async (body = {}, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        ...options, //  APPLY USER OPTIONS FIRST
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(options.headers || {}), //  MERGE CUSTOM HEADERS LAST
        },
        body: JSON.stringify(body),
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
      console.log("use data result", json);

      setData(json);
      return json;
    } catch (err) {
      console.log(err);

      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { remove, data, loading, error };
};

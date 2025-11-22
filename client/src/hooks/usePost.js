import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const post = async (body = {}, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(body),
        ...options,
      });

      const json = await res.json();

    // means token expired or wrong role accessing 
      if(res.status===401 || res.status===403){
        localStorage.removeItem('token');
        navigate('/login')
        return 
      }



      if (!res.ok) {
        throw new Error(json.message || "Something went wrong");
      }

      setData(json);
      return json;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { post, data, loading, error };
};

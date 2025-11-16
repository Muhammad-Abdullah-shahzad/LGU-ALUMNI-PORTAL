import { useState } from "react";

export const useUpdate = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

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

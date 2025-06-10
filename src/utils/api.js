
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
  try {
    const token = Cookies.get("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.post(`${apiUrl}${url}`, formData, { headers });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error("postData error:", error);
      throw error;
    }
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${apiUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error("fetchDataFromApi error:", error);
      throw error;
    }
  }
};

export const updatedData = async (url, updatedData) => {
  try {
    const token = Cookies.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(apiUrl + url, updatedData, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error("updateData error:", error);
      throw error;
    }
  }
};

export const searchUser = async (url) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.error("searchUser api error:", error);
      throw error;
    }
  }
};

export const useFetchData = (url) => {
  const [users, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        const res = await fetch(apiUrl + url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const text = await res.text();
        let result;
        try {
          result = JSON.parse(text);
        } catch (jsonErr) {
          console.error("Failed to parse JSON. Raw Response:", text);
          throw new Error("The response from the server is not in a valid JSON format.");
        }
        setData(result.users || []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);

  return { users, loading, error };
};

const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadFile = async (file, type = "image") => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/${type}/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );
  const data = await res.json();
  return data;
};

export default uploadFile;
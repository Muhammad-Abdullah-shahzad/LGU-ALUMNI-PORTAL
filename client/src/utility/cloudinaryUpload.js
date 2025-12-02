export async function cloudinaryUpload(file) {
  const cloudName = import.meta.env.VITE_Cloud_Name;
  const uploadPreset = import.meta.env.VITE_Preset; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData ,
    }
  );

  const data = await res.json();
  return data.secure_url;  // returns image link
}

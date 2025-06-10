const upload_preset = "chate_app";
const cloud_name = "dgulrg3t9";

const uploadFile = async (file, type = "image") => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${type}/upload`, {
    method: 'post',
    body: uploadData,
  });

  const data = await res.json();
  return data;
};

export default uploadFile;

export const uploadFile = async (file) => {
  try {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", "react-journal");
    formData.append("file", file);
    const resp = await fetch(cloudinaryUrl, { method: "POST", body: formData });
    if (resp.ok) {
      const cloudinaryResp = await resp.json();
      return cloudinaryResp.secure_url;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

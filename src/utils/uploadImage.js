// src/utils/uploadImage.js
export const uploadToImgBB = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("image", file);

  // Replace with your actual ImgBB API key or use process.env.NEXT_PUBLIC_IMGBBB_API_KEY
  const apiKey = "YOUR_IMGBB_API_KEY";

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    if (data.success) {
      return data.data.url; // Returns the direct image URL string
    }
    throw new Error(data.error.message);
  } catch (error) {
    console.error("ImgBB Upload Error:", error);
    return null;
  }
};

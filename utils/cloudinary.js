import axios from 'axios';

export const uploadImageToCloudinary = async (imageUri) => {
  try {
    // Đọc ảnh dạng base64
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const base64data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Convert to base64
    });

    const data = new FormData();
    data.append('file', base64data);
    data.append('upload_preset', 'Default');
    data.append('cloud_name', 'dibmnb2rp');

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dibmnb2rp/image/upload',
      data
    );

    return res.data.secure_url;
  } catch (err) {
    console.error('Upload lỗi:', err);
    return null;
  }
};

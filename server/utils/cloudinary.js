import { v2 as cloudinay } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinay.config({
  api_secret: process.env.API_SECRET,
  api_key: process.env.API_KEY,
  cloud_name: process.env.CLOUD_NAME,
});

export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinay.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinay.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinay.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error);
  }
};

export const deletePdfFromCloudinary = async (publicId) => {
  try {
    await cloudinay.uploader.destroy(publicId, { resource_type: "raw" });
  } catch (error) {
    console.log(error);
  }
};

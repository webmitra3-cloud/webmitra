import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary";
import { AppError } from "../utils/AppError";

function parseDataUri(dataUri: string) {
  const match = dataUri.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) {
    throw new AppError("Invalid image format. Please upload a valid image file.", 400);
  }
  const [, mimeType, base64Data] = match;
  const extension = mimeType.split("/")[1] || "png";
  return { base64Data, extension };
}

function sanitizeFolder(folder: string) {
  const trimmed = folder.trim().toLowerCase();
  if (!trimmed) return "webmitra";
  // Keep local filenames safe and prevent path traversal.
  return trimmed.replace(/[^a-z0-9_-]/g, "-").slice(0, 64) || "webmitra";
}

export async function uploadImage(dataUri: string, folder = "webmitra"): Promise<string> {
  if (!dataUri) return "";
  const safeFolder = sanitizeFolder(folder);

  if (!isCloudinaryConfigured) {
    throw new AppError("Image uploads require Cloudinary credentials in production.", 503);
  }

  parseDataUri(dataUri);
  const uploaded = await cloudinary.uploader.upload(dataUri, {
    folder: safeFolder,
    resource_type: "image",
  });
  return uploaded.secure_url;
}

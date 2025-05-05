import { S3Client, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://207aa2f2cb4d54cb6a83710a592ed8b0.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "fe235ad91057c2f31cd4258cb09a2594",
    secretAccessKey: "5fecc69061b3b8f43ffc8a2c97461d2986eb292daaa03022de8c05665bc0cd95"
  },
});

export async function listPDFs(bucketName) {
  try {
    const data = await s3.send(new ListObjectsCommand({ Bucket: bucketName }));
    const files = data.Contents || [];
    // Solo devolvemos los PDFs
    return files.filter(obj => obj.Key.endsWith('.pdf'));
  } catch (error) {
    console.error("Error listing PDFs: ", error);
    return [];
  }
}

export async function getDownloadUrl(bucketName, key) {
  try {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    return await getSignedUrl(s3, command, { expiresIn: 3600 });
  } catch (error) {
    console.error("Error generating download URL: ", error);
    return null;
  }
}

// Verifica si la portada existe (ej: "portadas/JavaScript Eloquente.jpg")
export async function portadaExists(bucketName, key) {
  try {
    await s3.send(new GetObjectCommand({ Bucket: bucketName, Key: key }));
    return true;
  } catch {
    return false;
  }
}


// ccOlrs5WkSWMcFYjIYeu5JlmXR3L2FXWdthYUixp
import crypto from "crypto";
import * as env from "../env.enc";

type EnvironmentConfiguration = {
  FIRESTORE_EMULATOR_HOST: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_DATABASE_URL: string;
  GOOGLE_SHEET_ID: string;
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
  SENDGRID_API_KEY: string;
};

export const getEnvironmentConfiguration = (): EnvironmentConfiguration => {
  const decipher = crypto.createDecipheriv(
    "aes-128-cbc",
    process.env.SERVICE_ENCRYPTION_KEY!,
    process.env.SERVICE_ENCRYPTION_IV!
  );

  let decrypted = decipher.update(env.encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
};

import { initializeApp, cert } from "firebase-admin/app";
import * as admin from "firebase-admin";
import { getEnvironmentConfiguration } from "./lib/environmentConfiguration";

export const initialiseFirebase = () => {
  const env = getEnvironmentConfiguration();
  if (!admin.apps.length) {
    return initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        privateKey: env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
      }),
      databaseURL: env.FIREBASE_DATABASE_URL,
    });
  }
};

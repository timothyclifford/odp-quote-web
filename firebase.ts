import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";

export const initialiseFirebase = () => {
  const firstbaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (firstbaseServiceAccount === undefined) {
    throw Error("FIREBASE_SERVICE_ACCOUNT environment variable not configured");
  }

  var serviceAccount: ServiceAccount = JSON.parse(firstbaseServiceAccount);

  return initializeApp({
    credential: cert(serviceAccount),
  });
};

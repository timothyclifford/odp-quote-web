import { getEnvironmentConfiguration } from "../lib/environmentConfiguration";

describe("environmentConfiguration", () => {
  it("downloads area pricing", async () => {
    const environmentConfiguration = getEnvironmentConfiguration();

    expect(environmentConfiguration).not.toBeNull();
    expect(environmentConfiguration).toHaveProperty("FIRESTORE_EMULATOR_HOST");
    expect(environmentConfiguration).toHaveProperty("FIREBASE_PROJECT_ID");
    expect(environmentConfiguration).toHaveProperty("FIREBASE_PRIVATE_KEY");
    expect(environmentConfiguration).toHaveProperty("FIREBASE_CLIENT_EMAIL");
    expect(environmentConfiguration).toHaveProperty("FIREBASE_DATABASE_URL");
    expect(environmentConfiguration).toHaveProperty("GOOGLE_SHEET_ID");
    expect(environmentConfiguration).toHaveProperty(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL"
    );
    expect(environmentConfiguration).toHaveProperty("GOOGLE_PRIVATE_KEY");
    expect(environmentConfiguration).toHaveProperty("SENDGRID_API_KEY");
  });
});

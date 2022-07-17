import { CMSService } from "../domain/cms/cmsService";

describe("PricingService", () => {
  describe("getAreaPricing", () => {
    it("downloads area pricing", async () => {
      const service = CMSService();
      const pricing = await service.getAreaPricing();

      expect(pricing).not.toBeNull();
      expect(pricing).not.toHaveLength(0);
    });
  });
  describe("getItemPricing", () => {
    it("downloads item pricing", async () => {
      const service = CMSService();
      const pricing = await service.getItemPricing();

      expect(pricing).not.toBeNull();
      expect(pricing).not.toHaveLength(0);
    });
  });
  describe("getExtraPricing", () => {
    it("downloads extra pricing", async () => {
      const service = CMSService();
      const pricing = await service.getExtraPricing();

      expect(pricing).not.toBeNull();
      expect(pricing).not.toHaveLength(0);
    });
  });
});

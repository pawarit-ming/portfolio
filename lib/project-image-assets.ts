import type { StaticImageData } from "next/image";
import rfqList from "@/public/projects/fyt-sme-platform/client-rfq-list.webp";
import rfqForm from "@/public/projects/fyt-sme-platform/client-rfq-form.webp";
import workflowSettings from "@/public/projects/fyt-sme-platform/wi-settings.webp";
import registration from "@/public/projects/asset-management-system/registration-wizard.webp";
import inspection from "@/public/projects/asset-management-system/inspection.webp";
import supplier from "@/public/projects/asset-management-system/add-supplier.webp";
import herd from "@/public/projects/thai-cattle-passport/herd-list-screen.webp";
import profile from "@/public/projects/thai-cattle-passport/cow-profile-screen.webp";
import activity from "@/public/projects/thai-cattle-passport/activity-log-screen.webp";
import passport from "@/public/projects/thai-cattle-passport/qr-passport-screen.webp";
import marketplace from "@/public/projects/thai-cattle-passport/marketplace-screen.webp";
import location from "@/public/projects/thai-cattle-passport/seller-location-screen.webp";

// Intrinsic dimensions keep a screenshot's border on its visible image edges.
export const projectImageAssets: Record<string, StaticImageData> = {
  "/projects/fyt-sme-platform/client-rfq-list.webp": rfqList,
  "/projects/fyt-sme-platform/client-rfq-form.webp": rfqForm,
  "/projects/fyt-sme-platform/wi-settings.webp": workflowSettings,
  "/projects/asset-management-system/registration-wizard.webp": registration,
  "/projects/asset-management-system/inspection.webp": inspection,
  "/projects/asset-management-system/add-supplier.webp": supplier,
  "/projects/thai-cattle-passport/herd-list-screen.webp": herd,
  "/projects/thai-cattle-passport/cow-profile-screen.webp": profile,
  "/projects/thai-cattle-passport/activity-log-screen.webp": activity,
  "/projects/thai-cattle-passport/qr-passport-screen.webp": passport,
  "/projects/thai-cattle-passport/marketplace-screen.webp": marketplace,
  "/projects/thai-cattle-passport/seller-location-screen.webp": location,
};

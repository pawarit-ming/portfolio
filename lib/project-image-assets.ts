import type { StaticImageData } from "next/image";
import rfqList from "@/public/projects/fyt-sme-platform/client-rfq-list.png";
import rfqForm from "@/public/projects/fyt-sme-platform/client-rfq-form.png";
import workflowSettings from "@/public/projects/fyt-sme-platform/wi-settings.png";
import registration from "@/public/projects/asset-management-system/registration-wizard.png";
import inspection from "@/public/projects/asset-management-system/inspection.png";
import supplier from "@/public/projects/asset-management-system/add-supplier.png";
import herd from "@/public/projects/thai-cattle-passport/herd-list-screen.png";
import profile from "@/public/projects/thai-cattle-passport/cow-profile-screen.png";
import activity from "@/public/projects/thai-cattle-passport/activity-log-screen.png";
import passport from "@/public/projects/thai-cattle-passport/qr-passport-screen.png";
import marketplace from "@/public/projects/thai-cattle-passport/marketplace-screen.png";
import location from "@/public/projects/thai-cattle-passport/seller-location-screen.png";

// Intrinsic dimensions keep a screenshot's border on its visible image edges.
export const projectImageAssets: Record<string, StaticImageData> = {
  "/projects/fyt-sme-platform/client-rfq-list.png": rfqList,
  "/projects/fyt-sme-platform/client-rfq-form.png": rfqForm,
  "/projects/fyt-sme-platform/wi-settings.png": workflowSettings,
  "/projects/asset-management-system/registration-wizard.png": registration,
  "/projects/asset-management-system/inspection.png": inspection,
  "/projects/asset-management-system/add-supplier.png": supplier,
  "/projects/thai-cattle-passport/herd-list-screen.png": herd,
  "/projects/thai-cattle-passport/cow-profile-screen.png": profile,
  "/projects/thai-cattle-passport/activity-log-screen.png": activity,
  "/projects/thai-cattle-passport/qr-passport-screen.png": passport,
  "/projects/thai-cattle-passport/marketplace-screen.png": marketplace,
  "/projects/thai-cattle-passport/seller-location-screen.png": location,
};

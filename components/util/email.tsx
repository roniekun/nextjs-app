import { admin } from "@/data/admin-data";
export default function EmailTo() {
  const mailtoUrl = `mailto:${admin.email}?subject=${encodeURIComponent(
    "project inquiry"
  )}`;
  const newTab = window.open(mailtoUrl, "_blank");
  if (newTab) {
    newTab.opener = null;
  }
}

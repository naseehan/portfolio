import { redirect } from "next/navigation";

// Legacy URL from the old site: send visitors and search engines to the Experience section
export default function LegacyServicesPage() {
  redirect("/experience");
}

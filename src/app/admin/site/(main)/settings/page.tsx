import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ campusId?: string }>;
};

export default async function SiteSettingsIndexPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.campusId?.trim()
    ? `?campusId=${encodeURIComponent(sp.campusId.trim())}`
    : "";
  redirect(`/admin/site/settings/carousel${q}`);
}

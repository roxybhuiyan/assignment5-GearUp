import { requireUser } from "@/lib/session";
import { ProfileForm } from "@/components/dashboard/profile-form";

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">Update your account information.</p>
      </div>
      <ProfileForm user={user} />
    </div>
  );
}

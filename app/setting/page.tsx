import { auth } from "@/auth";
import SettingComponent from "@/components/setting/SettingComponent";
import SettingList from "@/components/setting/SettingLists";
import { db } from "@/lib/db";
import paths from "@/paths";

const ListItems = [
  { name: "profile", url: paths.settingPageUrl() },
  { name: "friends", url: paths.SettingFriends() },
  { name: "account", url: paths.SettingAccount() },
];

export default async function SettingPage() {
  const session = await auth();
  // not use no-cache so far but need to fix maybe for future
  const user = await db.user.findUnique({
    where: { id: session?.user.id }
  });

  return (
    <div className="grid grid-cols-[180px_auto] mx-10 pt-16 gap-5">
      {/* List */}
      <div>
        <SettingList ListItems={ListItems} params={"profile"} />
      </div>

      {/* Component */}
      <SettingComponent session={session} user={user} />
    </div>
  )
}
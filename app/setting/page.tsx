import { auth } from "@/auth";
import SettingComponent from "@/components/setting/SettingComponent";
import SettingList from "@/components/setting/SettingLists";
import paths from "@/paths";

const ListItems = [
  { name: "profile", url: paths.settingPageUrl() },
  { name: "friends", url: paths.SettingFriends() },
  { name: "account", url: paths.SettingAccount() },
];

export default async function SettingPage() {
  const session = await auth();

  return (
    <div className="grid grid-cols-[180px_auto] mx-10 pt-16 gap-5 min-h-[calc(100vh-180px)]">
      {/* List */}
      <div>
        <SettingList ListItems={ListItems} params={"profile"} />
      </div>

      {/* Component */}
      <SettingComponent session={session} />
    </div>
  )
}
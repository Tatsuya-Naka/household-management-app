// import { auth } from "@/auth";
import FriendsComponent from "@/components/setting/FriendsComponent";
import SettingList from "@/components/setting/SettingLists";
import paths from "@/paths";

const ListItems = [
  { name: "profile", url: paths.settingPageUrl() },
  { name: "friends", url: paths.SettingFriends() },
  { name: "account", url: paths.SettingAccount() },
];

export default function FriendsSettingPage() {
  return (
    <div className="grid grid-cols-[180px_auto] mx-10 pt-16 gap-5 min-h-[calc(100vh-180px)]">
      {/* List */}
      <div>
        <SettingList ListItems={ListItems} params={"friends"} />
      </div>

      {/* Component */}
      <FriendsComponent />
    </div>
  )
}
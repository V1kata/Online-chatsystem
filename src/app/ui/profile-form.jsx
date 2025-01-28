"use client"
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/authentication";

export function ProfileForm() {
  const { userData, setUserData } = useUser();
  const router = useRouter()
  async function handleUpdate(formData) {
    const { username, profileImageUrl } = Object.fromEntries(formData);
    const userProfile = { username, profileImageUrl, 'user_id': userData.id, email: userData.email };

    try {
      const data = await updateProfile(userProfile);
      setUserData(previousState => ({ ...previousState, ...data }));

      router.push("/chats/allchats");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form action={handleUpdate}>
      <h2 className="text-2xl font-semibold mb-6">Complete Your Profile</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full mb-4 p-2 border rounded-md focus:outline-none"
      />
      <input
        type="text"
        name="profileImageUrl"
        placeholder="Profile Image URL"
        className="w-full mb-4 p-2 border rounded-md focus:outline-none"
      />
      <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save Profile</button>
    </form>
  )
}


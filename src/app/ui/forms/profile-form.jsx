"use client"
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/authentication";
import { useState } from "react";

export function ProfileForm() {
  const { userData, setUserData } = useUser();
  const router = useRouter()    
  const [error, setError] = useState(null);
  
  async function handleUpdate(formData) {
    const { username, profileImageUrl } = Object.fromEntries(formData);
    const userProfile = { username, profileImageUrl, user_id: userData.user.id, email: userData.user.email};

    try {
      const data = await updateProfile(userProfile);

      if (data.error) {
        throw new Error(data.error);
      }
      
      setUserData(data);

      router.push("/chats");
    } catch (err) {
      setError(err.message.split(":")[1].trim());
      return;
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
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save Profile</button>
    </form>
  )
}


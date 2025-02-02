import { supabase } from "@/lib/setUp";

export async function getAllUsers(email = 'banana@gmail.com') {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select(`
                id,
                username,
                profileImageUrl,
                email
            `)
            .neq('email', email)
            .limit(10);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function searchForUser(input, id) {
    try {
        const { data, error } = await supabase
            .from("user_profiles")
            .select("*")
            .or(`email.ilike.%${input}%,username.ilike.%${input}%`)
            .neq("id", id);

        if (error) {
            console.error("Error searching for user:", error);
            return null;
        }

        return data
    } catch (err) {
        console.error(err);
    }
}

export async function sendFriendRequest(senderId, receiverId) {
    try {
        const { data, error } = await supabase
            .from("friend_requests")
            .insert([
                {
                    sender_id: senderId,
                    receiver_id: receiverId
                }
            ]);
        // need to put restriction so that one user cant send multiple requests to the same user

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function viewFriendRequest(senderId) {
    try {
        const { data, error } = await supabase
            .from("friend_requests")
            .select(`id,
                created_at,
                sender_id(
                    id,
                    email,
                    username,
                    profileImageUrl
                )`)
            .eq("receiver_id", senderId)

        if (error) {
            debugger
            throw Error(error.message);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function acceptFriendRequest(updatedFriendsArray, sender_id, receiver_id) {
    try {
        const { data, error } = await supabase
            .from("user_profiles")
            .update({ acceptedFriends: updatedFriendsArray })
            .eq("id", receiver_id)
            .select();

        const res = await supabase
            .from("friend_requests")
            .delete()
            .eq("sender_id", sender_id)
            .eq("receiver_id", receiver_id);

        const res2 = await supabase
            .from("user_profiles")
            .update({ acceptedFriends: updatedFriendsArray })
            .eq("id", sender_id);

        if (error || res.error || res2.error) {
            throw Error(error.message);
        }

        return data[0];
    } catch (err) {
        console.error(err);
    }
}
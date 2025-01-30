import { supabase } from "@/lib/setUp";

export async function getAllUsers(email = 'viktor.burboran@gmail.com') {
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

export async function searchForUser(input) {
    try {
        const { data, error } = await supabase
            .from("user_profiles")
            .select("*")
            .or(`email.ilike.%${input}%,username.ilike.%${input}%`);

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
                    email,
                    username,
                    profileImageUrl
                )`)
            .eq("receiver_id", senderId) // fix this to be the receiver_id

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
}
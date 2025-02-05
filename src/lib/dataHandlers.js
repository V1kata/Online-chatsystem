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

export async function acceptFriendRequest(sender_id, receiver_id) {
    try {
        const { data, error } = await supabase
            .from("chat_room")
            .insert([
                {
                    user1: sender_id,
                    user2: receiver_id
                }
            ])
            .select();

        const res = await supabase
            .from("friend_requests")
            .delete()
            .eq("sender_id", sender_id)
            .eq("receiver_id", receiver_id);

        if (error || res.error) {
            throw Error(error.message);
        }

        return data[0];
    } catch (err) {
        console.error(err);
    }
}

export async function getFriends(userId) {
    try {
        const { data, error } = await supabase
            .from("chat_room")
            .select(`id,
                user1(
                    id,
                    email,
                    username,
                    profileImageUrl
                ),
                user2(
                    id,
                    email,
                    username,
                    profileImageUrl
                )`)
            .or(`user1.eq.${userId},user2.eq.${userId}`);

        if (error) {
            throw Error(error.message);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function getMessages(chatId) {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select("*, sender(id, email, username, profileImageUrl, lastOnline, isOnline)")
            .eq("chat", chatId);

        if (error) {
            throw Error(error.message);
        }

        return data;
    } catch (err) {
        console.error(err);
    }
}
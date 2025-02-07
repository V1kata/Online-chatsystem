import { supabase } from "@/lib/setUp";

export async function getAllUsers(userId) {
    try {
        const excludedIds = await getExcludedUserIds(userId);
        let query = supabase
            .from("user_profiles")
            .select("id, username, profileImageUrl, email")
            .neq("id", userId);

        if (excludedIds.length > 0) {
            query = query.not("id", "in", `(${excludedIds.join(",")})`);
        }

        const { data, error } = await query;

        if (error) throw new Error(error.message);

        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function searchForUser(input, userId) {
    try {
        const excludedIds = await getExcludedUserIds(userId);
        let query = supabase
            .from("user_profiles")
            .select("id, username, profileImageUrl, email")
            .or(`email.ilike.%${input}%,username.ilike.%${input}%`)
            .neq("id", userId);

        if (excludedIds.length > 0) {
            query = query.not("id", "in", `(${excludedIds.join(",")})`);
        }

        const { data, error } = await query;

        if (error) throw new Error(error.message);

        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function getExcludedUserIds(userId) {
    try {
        const { data: friendRequests, error: friendsError } = await supabase
            .from("friend_requests")
            .select("sender_id, receiver_id")
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

        if (friendsError) throw new Error(friendsError.message);

        const friendIds = friendRequests
            ? friendRequests.flatMap(req => [req.sender_id, req.receiver_id]).filter(id => id !== userId)
            : [];

        const { data: chatRooms, error: chatRoomError } = await supabase
            .from("chat_room")
            .select("user1, user2")
            .or(`user1.eq.${userId},user2.eq.${userId}`);

        if (chatRoomError) throw new Error(chatRoomError.message);

        const chatUserIds = chatRooms
            ? chatRooms.flatMap(chat => [chat.user1, chat.user2]).filter(id => id !== userId)
            : [];

        const excludedIds = [...new Set([...friendIds, ...chatUserIds])];

        return excludedIds;
    } catch (err) {
        console.error("Error fetching excluded user IDs:", err);
        return [];
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
            .select(`*`)
            .eq("chat", chatId);

        if (error) {
            throw Error(error.message);
        }

        if (data.length === 0) {
            return [];
        }

        return data;
    } catch (err) {
        console.error(err);
    }
}
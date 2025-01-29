import { supabase } from "@/lib/setUp";

export async function registerUser({ email, password }) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            throw error;
        }

        let returnData = {
            id: data.user.id,
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            email: data.user.email,
            createdAt: data.user['created_at'],
            updatedAt: data.user['updated_at'],
        }

        await setSession(data.session.access_token, data.session.refresh_token);
        return returnData;
    } catch (err) {
        console.error('Unexpected error:', err);
        return { error: err };
    }
}

export async function updateProfile(userProfile) {
    try {
        const { data, error } = await supabase
            .from("user_profiles")
            .insert([userProfile]);

        if (error) {
            throw error;
        }

        return data ?? userProfile
    } catch (err) {
        console.error("Error inserting user profile:", err.message);
        throw err;
    }
}

export async function loginUser({ email, password }) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error != null) {
            throw error;
        }

        let userId = data.user.id;
        const res = await supabase.from('user_profiles').select('username, profileImageUrl, friends').eq('user_id', userId);

        debugger
        let returnData = {
            id: userId,
            accessToken: data.session.access_token,
            email: data.user.email,
            username: res.data[0].username,
            profileImageUrl: res.data[0].profileImageUrl,
            friends: res.data.friends,
        }

        await setSession(data.session.access_token, data.session.refresh_token);
        return returnData;
    } catch (err) {
        console.error('Unexpected error:', err);
        return { error: err };
    }
}

async function setSession(access_token, refresh_token) {
    try {
        const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return { error: err };
    }
}
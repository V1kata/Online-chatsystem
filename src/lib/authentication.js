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

        await setSession(data.session.access_token, data.session.refresh_token);
        return data;
    } catch (err) {
        console.error('Unexpected error:', err);
        return { error: err };
    }
}

export async function updateProfile(userProfile) {
    try {
        const { data, error } = await supabase
            .from("user_profiles")
            .insert([userProfile])
            .select();

        if (error) {
            throw error;
        }

        return data[0]
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
        const res = await supabase.from('user_profiles').select('id, username, profileImageUrl, friends').eq('user_id', userId);

        let returnData = {
            id: res.data[0].id,
            accessToken: data.session.access_token,
            email: data.user.email,
            username: res.data[0].username,
            profileImageUrl: res.data[0].profileImageUrl,
            friends: res.data[0].friends,
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

export async function getSession(params) {
    try {
        const { data, error } = await supabase.auth.getSession();

        const user = await getCurrentUser(data.session.user.id);

        return user;
    } catch (err) {
        console.error('Unexpected error:', err);
        return { error: err };
    }
}

async function getCurrentUser(user_id) {
    try {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('id, username, email, profileImageUrl, friends')
            .eq('user_id', user_id);

        return data
    } catch (err) {
        console.error('Unexpected error:', err);
        return { error: err };
    }
}

export async function logoutUser() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw error;
        }

        localStorage.removeItem('sb-mbzfehmethzunbrrpxls-auth-token');
        sessionStorage.removeItem('sb-mbzfehmethzunbrrpxls-auth-token');
    } catch (err) {
        console.error('Unexpected error:', err);
        return { error: err };
    }
}
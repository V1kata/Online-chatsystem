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
            email: data.user.email,
            createdAt: data.user['created_at'],
            updatedAt: data.user['updated_at'],
        }
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

        if (error) {
            throw error;
        }

        let userId = data.user.id;
        const res = await supabase.from('user_profiles').select('username, profileImageUrl').eq('user_id', userId);
        
        return res.data[0];
    } catch (err) {   
        console.error('Unexpected error:', err);
        return { error: err };
    }   
}
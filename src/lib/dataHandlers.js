import { supabase } from "@/lib/setUp";

export async function getAllUsers(email) {
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
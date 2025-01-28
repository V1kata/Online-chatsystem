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

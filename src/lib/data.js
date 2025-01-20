export async function registerUser({ email, password }) {
    try {
        let res = await supabase.auth.signIn({
            email, 
            password
        });
        return res;
    } catch(err) {
        console.error(err);
    }
}
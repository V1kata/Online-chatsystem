"use server";

import { revalidatePath } from "next/cache";

export async function refreshFriendRequestsAction(path) {
  revalidatePath(path);
}
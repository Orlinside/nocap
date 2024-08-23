"use server";
import * as z from "zod";

import { db } from "../db";

import { revalidatePath } from "next/cache";

import {
  CreateUserParams,
  UpdateUserParams,
  GetUserParams,
  DeleteUserParams,
} from "@/types";

//! GET USER BY ID
export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
}

//! GET USER BY EMAIL
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};

//! TOUS LES USERS
export async function getAllUsers() {
  try {
    const users = await db.user.findMany();
    return users;
  } catch {
    return null;
  }
}

//! DELETE USER
export const deleteUser = async ({ userId, path }: DeleteUserParams) => {
  try {
    const deletedUser = await db.user.delete({
      where: { id: userId },
    });

    if (deletedUser) revalidatePath(path);
  } catch (error) {
    return null;
  }
};

//! GET REACTIONS BY USER ID
export async function getReactionsByUserId(userId: string) {
  try {
    const reactions = await db.reaction.findMany({
      where: { userId },
    });
    return reactions;
  } catch {
    return null;
  }
}

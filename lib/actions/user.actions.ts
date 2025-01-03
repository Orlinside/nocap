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
import { logout } from "./auth.actions";

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
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}

//! DELETE USER
export const deleteUser = async ({ userId, path }: DeleteUserParams) => {
  try {
    const deletedUser = await db.user.delete({
      where: { id: userId },
    });

    if (deletedUser) {
      revalidatePath(path);
    }
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

//! GET COMMENTS BY USER ID
export async function getCommentsByUserId(userId: string) {
  try {
    const comments = await db.comment.findMany({
      where: { userId },
    });
    return comments;
  } catch {
    return null;
  }
}

//! UPDATE USER
export const updateUser = async ({ userId, user, path }: UpdateUserParams) => {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: user.name ? { name: user.name } : {},
    });

    if (updatedUser) revalidatePath(path);
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

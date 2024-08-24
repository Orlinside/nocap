"use server";
import { db } from "../db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  AddComment,
  DeleteComment,
  GetCommentsParams,
  UpdateCommentParams,
} from "@/types";
import { isValid } from "react-datepicker/dist/date_utils";
import { currentRole } from "../auth";
import { Role } from "@prisma/client";
import { getUserById } from "./user.actions";

//! CREATE COMMENT
export const createComment = async ({ userId, content, path }: AddComment) => {
  try {
    if (!userId) {
      return new NextResponse(null, { status: 401 });
    }

    const newComment = await db.comment.create({
      data: {
        content,
        userId,
        isValid: true,
        importance: "LOW", // Valeur par défaut
      },
    });

    revalidatePath(path);

    return newComment;
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};

//! DELETE COMMENT
export const deleteComment = async ({ commentId, path }: DeleteComment) => {
  try {
    const comment = await db.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return new NextResponse(null, { status: 404 });
    }

    await db.comment.delete({
      where: {
        id: commentId,
      },
    });

    revalidatePath(path);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};

//! GET COMMENTS
export const getAllComments = async ({
  limit = 10,
  page,
}: GetCommentsParams) => {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    const comments = await db.comment.findMany({
      skip: skipAmount,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalComments = await db.comment.count();

    return {
      data: comments,
      totalPages: Math.ceil(totalComments / limit),
    };
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};

//! GET ALL COMMENTS FOR PUBLIC
export const getAllCommentsForPublic = async () => {
  try {
    const comments = await db.comment.findMany({
      where: {
        isValid: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return comments;
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};

//! UPDATE ADMIN COMMENT
export const updateAdminComment = async ({
  commentId,
  importance,
  isValid,
  path,
}: UpdateCommentParams) => {
  const role = await currentRole();

  if (role !== Role.admin) {
    return new NextResponse(null, { status: 403 });
  }

  try {
    await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        importance,
        isValid,
      },
    });
    revalidatePath(path);

    return { status: "success" };
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};

//! DELETE COMMENT
export const deleteAdminComment = async ({
  commentId,
  path,
}: DeleteComment) => {
  try {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });

    revalidatePath(path);

    return { status: "success" };
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
};

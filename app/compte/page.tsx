import { LogoutBtn } from "@/components/auth/LogoutBtn";

import { Transition } from "@/components/shared/Transition";
import { currentUser } from "@/lib/auth";
import { getCommentsByUserId } from "@/lib/actions/user.actions";
import UpdateUserForm from "@/components/auth/UpdateUserForm";
import { DeleteCommentUser } from "@/components/shared/DeleteCommentUser";
import { DeleteUser } from "@/components/shared/DeleteUser";

export default async function Compte() {
  const user = await currentUser();
  const comments = user?.id ? await getCommentsByUserId(user.id) : null;

  return (
    <>
      <Transition>
        <section className="wrapper flex justify-center">
          <div className="mt-28 sm:mt-32 flex-col gap-6 w-full lg:w-3/4">
            <div className="w-full flex flex-col gap-4 bg-black bg-opacity-50 p-4 rounded-xl">
              <h1 className="border-b uppercase text-white renogare p-2 text-sm">
                Mes informations
              </h1>
              <div>
                <UpdateUserForm user={user} />
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-10 bg-black bg-opacity-50 p-4 rounded-xl">
              <h2 className="border-b uppercase text-white renogare p-2 text-sm">
                Mes commentaires
              </h2>
              <div>
                {comments ? (
                  comments.map((comment: any) => (
                    <div key={comment.id} className="">
                      <p className="renogare text-xs font-bold text-white border-b pb-1 flex justify-between">
                        {/* <span>{comment.author.pseudo}</span> */}
                        <span>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <p className=" font-bold text-white sm:ml-8 p-2">
                        {comment.content}
                      </p>
                      <DeleteCommentUser commentId={comment.id} />
                    </div>
                  ))
                ) : (
                  <p className="text-white">Aucun commentaire</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end items-center gap-4">
              <LogoutBtn>
                {/* <IoMdLogOut
                size={25}
                className="text-white hover:text-white/80 z-[200]"
                aria-label="Déconnexion"
              /> */}
                <p className="renogare text-sm font-bold">Déconnexion</p>
              </LogoutBtn>
              {user && <DeleteUser userId={user.id} />}
            </div>
          </div>
        </section>
      </Transition>
    </>
  );
}

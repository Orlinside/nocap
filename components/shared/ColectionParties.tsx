import React from "react";

type CollectionPartiesProps = {
  data: any;
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

export const ColectionParties = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  limit,
  page,
  totalPages,
  urlParamName,
}: CollectionPartiesProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div></div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-2/3 flex-col gap-3 rounded-sm bg-transparent backdrop-blur-sm py-28 text-center">
          {" "}
          <h3 className="p-bold-20 md:h5-bold ">{emptyTitle}</h3>
          <p className="p-regular-16 ">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

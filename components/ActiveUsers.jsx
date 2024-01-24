"use client";

import Image from "next/image";
import React, { useMemo } from "react";

import { generateRandomName } from "@/lib/utils";
import { useLive } from "@/context/LiveProvider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

//TODO */ Can be extracted somewhere and provided.
const Avatar = ({ name, otherStyles }) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`relative w-9 h-9 rounded-full ${otherStyles}`}
            data-tooltip={name}
          >
            <Image
              src={`https://liveblocks.io/avatars/avatar-${Math.floor(
                Math.random() * 30
              )}.png`}
              fill
              className="rounded-full"
              alt={name}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="px-2.5 py-1.5 border-none bg-primary-grey-200 text-xs">
          {name}
        </TooltipContent>
      </Tooltip>
    </>
  );
};

const ActiveUsers = () => {
  const { others, currentUser } = useLive();

  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = others.length > 2;

    return (
      <div className="flex justify-center items-center gap-1">
        {currentUser && (
          <Avatar name="You" otherStyles="border-[3px] border-primary-green" />
        )}

        {others.slice(0, 2).map(({ connectionId }) => (
          <Avatar
            key={connectionId}
            name={generateRandomName()}
            otherStyles="-ml-3"
          />
        ))}

        {hasMoreUsers && (
          <div className="w-9 h-9 rounded-full flex items-center justify-center -ml-3 bg-primary-black z-10">
            +{others.length - 2}
          </div>
        )}
      </div>
    );
  }, [others, currentUser]);

  return memoizedUsers;
};

export default ActiveUsers;

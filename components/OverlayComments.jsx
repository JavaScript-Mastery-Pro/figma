"use client";

import { useThreads } from "@/liveblocks.config";
import { Composer, Thread } from "@liveblocks/react-comments";

import React, { memo } from "react";
import "@liveblocks/react-comments/styles.css";

const OverlayComments = () => {
  const { threads } = useThreads();

  return (
    <div>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} />
      ))}
      <Composer />
    </div>
  );
};

export default OverlayComments;

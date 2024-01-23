"use client";

import { LiveMap } from "@liveblocks/client";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export function Room({ children }) {
  return (
    <RoomProvider
      id="jsm-figma-room"
      initialPresence={{ cursor: null, cursorColor: null }}
      initialStorage={{
        canvasObjects: new LiveMap(),
      }}
    >
      <ClientSideSuspense
        fallback={
          <div className="flex items-center justify-center text-figmaGrey-300">
            <p>Loading...</p>
          </div>
        }
      >
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

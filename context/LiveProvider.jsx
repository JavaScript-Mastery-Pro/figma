"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import {
  useMutation,
  useStorage,
  useUndo,
  useRedo,
  useOthers,
  useMyPresence,
  useSelf,
} from "@/liveblocks.config";
import { CURSOR_COLORS } from "@/constants";

const LiveContext = createContext();

export const LiveProvider = ({ children }) => {
  const undo = useUndo();
  const redo = useRedo();
  const others = useOthers();
  const currentUser = useSelf();

  const [myPresence, updateMyPresence] = useMyPresence();
  const [cursorState, setCursorState] = useState({
    mode: "hidden",
    previousMessage: null,
    message: "",
  });

  const canvasObjects = useStorage((root) => root.canvasObjects);

  const updateShapeInStorage = useMutation(
    ({ storage }, shapeId, shapeData) => {
      const canvasObjects = storage.get("canvasObjects");
      canvasObjects.set(shapeId, shapeData);
    },
    []
  );

  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.delete(shapeId);
  }, []);

  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get("canvasObjects");

    if (!canvasObjects || canvasObjects.size === 0) return true;

    for (const [key, value] of canvasObjects.entries()) {
      canvasObjects.delete(key);
    }

    return canvasObjects.size === 0;
  }, []);

  const syncShapeInStorage = (object) => {
    if (!object) return;
    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;
    updateShapeInStorage(objectId, shapeData);
  };

  function handlePointerMove(e) {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave(e) {
    updateMyPresence({ cursor: null });
  }

  function handleKeyUp(e) {
    if (e.key === "/") {
      setCursorState({
        mode: "chat",
        previousMessage: null,
        message: "",
      });
    }

    if (e.key === "Escape") {
      setCursorState({
        mode: "hidden",
      });
    }
  }

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * CURSOR_COLORS.length);
    const randomColor = CURSOR_COLORS[randomNumber];

    updateMyPresence({ cursor: null, color: randomColor });
  }, []);

  return (
    <LiveContext.Provider
      value={{
        others,
        undo,
        redo,
        currentUser,
        myPresence,
        cursorState,
        canvasObjects,
        setCursorState,
        updateShapeInStorage,
        deleteShapeFromStorage,
        deleteAllShapes,
        syncShapeInStorage,
        updateMyPresence,
        handlePointerMove,
        handlePointerLeave,
        handleKeyUp,
      }}
    >
      {children}
    </LiveContext.Provider>
  );
};

export const useLive = () => {
  const context = useContext(LiveContext);

  if (!context) {
    throw new Error("useLive must be used within a LiveProvider");
  }

  return context;
};

export default LiveContext;

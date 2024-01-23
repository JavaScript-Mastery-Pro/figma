"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";

import { modes } from "@/constants";
import { useLive } from "./LiveProvider";

import { createShape, modifyShape } from "@/lib/shapes";
import { handleDelete, handleKeyDown } from "@/lib/key-events";
import { groupObjects, ungroupObjects } from "@/lib/utils";

const FigmaContext = createContext();

export const FigmaProvider = ({ children }) => {
  let mousePressed = false;
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const fabricCanvasRef = useRef(null);
  const activeObjectsRef = useRef(null);

  const imageInputRef = useRef(null);
  const selectedShapeRef = useRef(null);
  const selectedShapeTypeRef = useRef(null);
  const [activeElement, setActiveElement] = useState(null);

  const {
    undo,
    redo,
    canvasObjects,
    handleKeyUp,
    syncShapeInStorage,
    deleteAllShapes,
    deleteShapeFromStorage,
  } = useLive();

  const [elementAttributes, setElementAttributes] = useState({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    elementColor: "#aabbcc",
    strokeColor: "#aabbcc",
    alignment: "",
  });

  const initializaFabricCanvas = useCallback(() => {
    const designPanel = document.getElementById("design")?.offsetWidth;
    const layerPanel = document.getElementById("layers")?.offsetWidth;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth - (designPanel + layerPanel),
      height: window.innerHeight,
      isDrawingMode: false,
    });

    fabricCanvasRef.current = canvas;
    return canvas;
  }, []);

  const handleElementSelect = (elem) => {
    setActiveElement(elem);

    if (elem !== "image" && elem !== "comments") {
      selectedShapeTypeRef.current = elem;

      if (elem === "reset") {
        deleteAllShapes();
        fabricCanvasRef.current.clear();
        setActiveElement(null);
      }

      if (elem === "delete") {
        handleDelete(fabricCanvasRef.current, deleteShapeFromStorage);
        setActiveElement(null);
      }
    } else {
      selectedShapeTypeRef.current = "";
    }
  };

  const handleCanvasMouseDown = (canvas, options) => {
    const pointer = canvas.getPointer(options.e);
    const target = canvas.findTarget(options.e);

    mousePressed = true;

    isDrawingRef.current = true;

    if (!target) {
      const createdShape = createShape(
        canvas,
        pointer,
        selectedShapeTypeRef.current
      );

      if (createdShape) {
        canvas.isDrawingMode = false;
        selectedShapeRef.current = createdShape;
        canvas.add(createdShape);
      }
    }
  };

  const handleCanvasMouseMove = (canvas, options) => {
    const pointer = canvas.getPointer(options.e);

    switch (selectedShapeTypeRef.current) {
      case modes.pan:
        if (mousePressed) {
          canvas.setCursor("grab");

          const mEvent = options.e;
          const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);

          canvas.relativePan(delta);
        }
        break;

      case "rectangle":
        if (isDrawingRef.current) {
          const width = Math.abs(pointer.x - selectedShapeRef.current.left);
          const height = Math.abs(pointer.y - selectedShapeRef.current.top);

          selectedShapeRef.current.set({ width, height });
          canvas.renderAll();
        }
        break;

      case "circle":
        if (isDrawingRef.current) {
          const radius = Math.abs(pointer.x - selectedShapeRef.current.left);
          selectedShapeRef.current.set({ radius });
        }
        break;

      case "triangle":
        if (isDrawingRef.current) {
          const width = Math.abs(pointer.x - selectedShapeRef.current.left);
          const height = Math.abs(pointer.y - selectedShapeRef.current.top);

          selectedShapeRef.current.set({ width, height });
        }
        break;

      case "line":
        if (isDrawingRef.current) {
          selectedShapeRef.current.set({
            x2: pointer.x,
            y2: pointer.y,
          });
        }
        break;

      default:
        break;
    }

    canvas.renderAll();
  };

  const handleCanvasMouseUp = (canvas) => {
    isDrawingRef.current = false;

    syncShapeInStorage(selectedShapeRef.current);

    selectedShapeRef.current = null;
    selectedShapeTypeRef.current = null;

    if (!canvas.isDrawingMode) {
      setTimeout(() => {
        setActiveElement("select");
      }, 700);
    }
  };

  const handleCanvasObjectModified = (e) => {
    const modifiedObject = e.target;

    console.log("Object modified...", modifiedObject);

    // check if object is a group
    if (modifiedObject.type === "activeSelection") {
      // get all objects in the group
      const group = modifiedObject.getObjects();
      console.log("Group...", group);

      // TODO: work under progress
      group.forEach((obj) => {
        obj.set({
          left: modifiedObject.left + obj.left,
          top: modifiedObject.top + obj.top,
        });

        syncShapeInStorage(obj);
      });
    } else {
      syncShapeInStorage(modifiedObject);
    }
  };

  const handleCanvasPathCreated = (e) => {
    const drawingPath = e.path;
    drawingPath.objectId = uuidv4();

    fabricCanvasRef.isDrawingMode = false;
    syncShapeInStorage(drawingPath);
  };

  const handleSelectionCreated = (e) => {
    activeObjectsRef.current = fabricCanvasRef.current.getActiveObjects();

    console.log("Selection created...");
  };

  const handleResize = () => {
    const canvas = fabricCanvasRef.current;

    if (canvas) {
      const designPanel = document.getElementById("design")?.offsetWidth || 0;
      const layerPanel = document.getElementById("layers")?.offsetWidth || 0;

      canvas.setDimensions({
        width: window.innerWidth - (designPanel + layerPanel),
        height: window.innerHeight,
      });
    }
  };

  // Register fabricjs and keyboard events
  useEffect(() => {
    const canvas = initializaFabricCanvas();

    canvas.on("mouse:down", (e) => handleCanvasMouseDown(canvas, e));
    canvas.on("mouse:move", (e) => handleCanvasMouseMove(canvas, e));
    canvas.on("mouse:up", (e) => handleCanvasMouseUp(canvas));
    canvas.on("object:modified", (e) => handleCanvasObjectModified(e));
    canvas.on("path:created", (e) => handleCanvasPathCreated(e));
    canvas.on("selection:created", (e) => handleSelectionCreated(e));

    window.addEventListener("keydown", (e) =>
      handleKeyDown(e, canvas, undo, redo, deleteShapeFromStorage)
    );
    window.addEventListener("keyup", (e) => handleKeyUp(e));
    window.addEventListener("resize", () => handleResize(canvas));

    return () => {
      canvas.dispose();

      window.removeEventListener("keydown", (e) =>
        handleKeyDown(e, canvas, undo, redo)
      );
      window.removeEventListener("keyup", (e) => handleKeyUp(e));
      window.removeEventListener("resize", () => handleResize(canvas));
    };
  }, []);

  // apply the selected element attributes to the selected shape of canvas
  useEffect(() => {
    modifyShape(
      fabricCanvasRef.current,
      activeObjectsRef,
      elementAttributes,
      syncShapeInStorage
    );
  }, [elementAttributes]);

  useEffect(() => {
    fabricCanvasRef.current.clear();

    Array.from(canvasObjects, ([objectId, objectData]) => {
      fabric.util.enlivenObjects([objectData], (enlivenedObjects) => {
        enlivenedObjects.forEach((enlivenedObj) => {
          fabricCanvasRef.current.add(enlivenedObj);
        });
      });

      fabricCanvasRef.current.renderAll();
    });
  }, [canvasObjects]);

  const handleGrouping = (value) => {
    if (value === "group") {
      groupObjects(fabricCanvasRef.current, syncShapeInStorage);
    }

    if (value === "ungroup") {
      ungroupObjects(fabricCanvasRef.current, syncShapeInStorage);
    }
  };

  return (
    <FigmaContext.Provider
      value={{
        canvasRef,
        imageInputRef,
        activeElement,
        fabricCanvasRef,
        setActiveElement,
        selectedShapeRef,
        handleElementSelect,
        elementAttributes,
        setElementAttributes,
        selectedShapeTypeRef,
        handleGrouping,
      }}
    >
      {children}
    </FigmaContext.Provider>
  );
};

export const useFigma = () => {
  const context = useContext(FigmaContext);

  if (!context) {
    throw new Error("useFigma must be used within a FigmaProvider");
  }

  return context;
};

export default FigmaContext;

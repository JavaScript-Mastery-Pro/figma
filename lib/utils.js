import jsPDF from "jspdf";
import { clsx } from "clsx";
import { v4 as uuidv4 } from "uuid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function exportToPDF() {
  const canvasElement = document.querySelector("canvas");

  // Convert the canvas content to a data URL
  const dataUrl = canvasElement.toDataURL();

  // Create a new jsPDF instance
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
  });

  // Add an image to the PDF using the data URL
  pdf.addImage(dataUrl, "PNG", 10, 10, 190, 277);

  // Save or open the PDF
  pdf.save("canvas-export.pdf");
}

// create a function to group selected objects from fabricjs canvas
export function groupObjects(canvas, syncShapeInStorage) {
  const activeObjects = canvas.getActiveObjects();

  if (activeObjects.length > 0) {
    const group = new fabric.Group(activeObjects, {
      objectId: uuidv4(),
    });

    canvas.discardActiveObject();
    canvas.add(group);
    canvas.requestRenderAll();

    syncShapeInStorage(group);
  }
}

// create a function to ungroup selected objects from fabricjs canvas
export function ungroupObjects(canvas, syncShapeInStorage) {
  const activeObject = canvas.getActiveObject();

  if (activeObject && activeObject.type === "group") {
    activeObject.toActiveSelection();
    canvas.requestRenderAll();

    syncShapeInStorage(activeObject);
  }
}

// create a function to align selected objects from fabricjs canvas
export function alignObjects(canvas, alignment, syncShapeInStorage) {
  const activeObjects = canvas.getActiveObjects();

  if (activeObjects.length > 0) {
    const group = new fabric.Group(activeObjects, {
      objectId: uuidv4(),
    });

    switch (alignment) {
      case "left":
        group.left = 0;
        break;
      case "horizontalCenter":
        group.left = canvas.width / 2 - group.width / 2;
        break;
      case "right":
        group.left = canvas.width - group.width;
        break;
      case "top":
        group.top = 0;
        break;
      case "verticalCenter":
        group.top = canvas.height / 2 - group.height / 2;
        break;
      case "bottom":
        group.top = canvas.height - group.height;
        break;
      default:
        break;
    }

    canvas.discardActiveObject();
    canvas.add(group);
    canvas.requestRenderAll();

    syncShapeInStorage(group);
  }
}

// write a function that generates randomes names similar to Google Docs (funny) names
export function generateRandomName() {
  const adjectives = [
    "Adaptable",
    "Adventurous",
    "Affable",
    "Affectionate",
    "Agreeable",
    "Ambitious",
    "Amiable",
    "Amicable",
    "Amusing",
    "Brave",
    "Bright",
    "Broad-minded",
    "Calm",
    "Careful",
    "Charming",
    "Communicative",
    "Compassionate",
    "Conscientious",
    "Considerate",
    "Convivial",
    "Courageous",
    "Courteous",
    "Creative",
    "Decisive",
    "Determined",
    "Diligent",
    "Diplomatic",
    "Dynamic",
    "Easygoing",
    "Emotional",
    "Energetic",
    "Enthusiastic",
    "Exuberant",
    "Fair-minded",
    "Faithful",
    "Fearless",
    "Forceful",
    "Frank",
    "Friendly",
    "Funny",
    "Generous",
    "Gentle",
    "Good",
    "Gregarious",
    "Hard-working",
    "Helpful",
    "Honest",
    "Humorous",
    "Imaginative",
    "Impartial",
    "Independent",
    "Intellectual",
    "Intelligent",
    "Intuitive",
    "Inventive",
    "Kind",
    "Loving",
    "Loyal",
    "Modest",
    "Neat",
    "Nice",
    "Optimistic",
    "Passionate",
    "Patient",
    "Persistent",
    "Pioneering",
    "Philosophical",
    "Placid",
    "Plucky",
    "Polite",
    "Powerful",
    "Practical",
    "Pro-active",
    "Quick-witted",
    "Quiet",
    "Rational",
    "Reliable",
    "Reserved",
    "Resourceful",
    "Romantic",
    "Self-confident",
    "Self-disciplined",
    "Sensible",
    "Sensitive",
    "Shy",
    "Sincere",
    "Sociable",
    "Straightforward",
    "Sympathetic",
    "Thoughtful",
    "Tidy",
    "Tough",
    "Unassuming",
    "Understanding",
    "Versatile",
    "Warmhearted",
  ];

  const nouns = [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Anteater",
    "Antelope",
    "Ape",
    "Armadillo",
    "Donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Bison",
    "Boar",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Capybara",
    "Caribou",
    "Cassowary",
    "Cat",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Clam",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Coyote",
    "Crab",
    "Crane",
    "Crocodile",
    "Crow",
    "Curlew",
    "Deer",
    "Dinosaur",
    "Dog",
    "Dogfish",
    "Dolphin",
    "Dotterel",
    "Dove",
    "Dragonfly",
    "Duck",
    "Dugong",
    "Dunlin",
    "Eagle",
    "Echidna",
    "Eel",
    "Eland",
    "Elephant",
    "Elk",
    "Emu",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Flamingo",
    "Fly",
    "Fox",
    "Frog",
    "Gaur",
    "Gazelle",
    "Gerbil",
    "Giraffe",
    "Gnat",
    "Gnu",
    "Goat",
    "Goldfinch",
    "Goldfish",
    "Goose",
    "Gorilla",
    "Goshawk",
    "Grasshopper",
    "Grouse",
    "Guanaco",
    "Gull",
    "Hamster",
    "Hare",
    "Hawk",
    "Hedgehog",
    "Heron",
    "Herring",
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective} ${noun}`;
}

/**
 * 
 */
export class ShapeBrowser {
    shapes = [
        {
          tabName: "Visage",
          selectedIndex: 0,
          path: "/assets/faceshapes/",
          shapes: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
          shapeColor: {
            color1: "#fff0",
            color2: null,
            set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
          },
          objects: [null, null, null, null, null, null, null, null, null],
          objectColor: null,
          layersLevels: [0]
        },
        {
          tabName: "Yeux",
          selectedIndex: 0,
          path: "/assets/eyes/",
          shapes: ["01", "02", "03", "04", "05"],
          shapeColor: {
            color1: "#fff0",
            color2: null,
            set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
          },
          objects: [null, null, null, null, null],
          objectColor: null,
          layersLevels: [50]
        },
        {
          tabName: "Bouche",
          selectedIndex: 0,
          path: "/assets/mouths/",
          shapes: ["01", "02"],
          shapeColor: {
            color1: "#fff0",
            color2: null,
            set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
          },
          objects: [null, null],
          objectColor: null,
          layersLevels: [20]
        },
        {
          tabName: "Barbe",
          selectedIndex: 0,
          path: "/assets/beards/",
          shapes: [null, "01"],
          shapeColor: {
            color1: "#fff0",
            color2: null,
            set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
          },
          objects: [null],
          objectColor: null,
          layersLevels: [10, 30]
        },
        {
          tabName: "Cheveux",
          selectedIndex: 0,
          path: "/assets/hair/",
          shapes: [null, "01"],
          shapeColor: {
            color1: "#fff0",
            color2: null,
            set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
          },
          objects: [null, "01"],
          objectColor: null,
          layersLevels: [70, 45]
        },
        {
          tabName: "Cheveux longs",
          selectedIndex: 0,
          path: "/assets/longhair/",
          shapes: [null, "01"],
          shapeColor: {
            color1: "#fff0",
            color2: null,
            set: ["#fff0", "#fff", "#f00", "#0f0", "#00f"]
          },
          objects: [null, null],
          objectColor: null,
          layersLevels: [-20]
        },
        {
          tabName: "Arrière plan",
          selectedIndex: 0,
          path: "/assets/background/",
          shapes: [null, "01", "02", "03", "04"],
          shapeColor: null,
          objects: [null, null, null, null, null, null],
          objectColor: null,
          layersLevels: [-50]
        }
    ];
}
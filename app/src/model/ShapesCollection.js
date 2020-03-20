import { ShapeType } from "./ShapeType";

/**
 * 
 */
export default class ShapesCollection {
    shapes = [
        {
            name: "Visage",
            selectedIndex: 0,
            type: ShapeType.face,
            collections: [
                {
                  idx: 0,
                  name: "Normal",
                  path: "/face/default",
                  elements: [null, "01", "02", "03"],
                  selectedIndex: 1,
                },
                {
                  idx: 1,
                  name: "Barbu",
                  path: "/face/beard",
                  elements: [null, "01"],
                  selectedIndex: 0,
                }
            ]
        },
        {
            name: "Bouche",
            selectedIndex: 0,
            type: ShapeType.mouth,
            collections: [
                {
                  idx: 0,
                  name: "Normal",
                  path: "/mouth/default",
                  elements: [null, "01", "02"],
                  selectedIndex: 1,
                }
            ]
        },
        {
            name: "Yeux",
            selectedIndex: 0,
            type: ShapeType.eye,
            collections: [
                {
                  idx: 0,
                  name: "Normaux",
                  path: "/eye/default",
                  elements: [null, "01", "02", "03", "04", "05"],
                  selectedIndex: 1,
                }
            ]
        },
        {
            name: "Cheveux",
            selectedIndex: 0,
            type: ShapeType.hair,
            collections: [
                {
                  idx: 0,
                  name: "Normaux",
                  path: "/hair/default",
                  elements: [null, "01"],
                  selectedIndex: 0,
                }
            ]
        },
        {
            name: "Cheveux longs",
            selectedIndex: 0,
            type: ShapeType.longHair,
            collections: [
                {
                  idx: 0,
                  name: "Normaux",
                  path: "/longhair/default",
                  elements: [null, "01"],
                  selectedIndex: 0,
                }
            ]
        },
        {
            name: "Arrière plan",
            selectedIndex: 0,
            type: ShapeType.background,
            collections: [
                {
                  idx: 0,
                  name: "Abstraits",
                  path: "/background/default",
                  elements: [null],
                  selectedIndex: 0,
                }
            ]
        }
    ];
}
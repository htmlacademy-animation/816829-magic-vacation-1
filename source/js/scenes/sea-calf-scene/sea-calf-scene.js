import {Scene} from 'scenes/scene';

import blob from './blob';
import animalOnIce from './animal-on-ice';
import tree1 from './tree1';
import tree2 from './tree2';
import snow1 from './snow1';
import snow2 from './snow2';
import plane from './plane';

const ZOOM = 400;

const container = document.querySelector(`.result--trip`);

const foreground = new Scene({
  name: `foreground`,
  container,
  canvas: document.querySelector(`.result--trip .result__canvas--foreground`),
  zoom: ZOOM,
  animationProps: {
    duration: 3000,
  },
  objects: [
    blob,
    tree1,
    tree2,
    animalOnIce,
    plane,
  ],
});

const background = new Scene({
  name: `background`,
  container,
  canvas: document.querySelector(`.result--trip .result__canvas--background`),
  zoom: ZOOM,
  animationProps: {
    duration: Infinity,
  },
  objects: [
    snow1,
    snow2,
  ],
});

export default {
  activate() {
    foreground.activate();
    background.activate();
  },
  deactivate() {
    foreground.deactivate();
    background.deactivate();
  },
};

import {SceneObject} from 'scenes/scene-object';
import {SceneObjectState} from 'scenes/scene-object-state';
import {FrameAnimation} from 'helpers/frame-animation';

export default new SceneObject({
  images: [
    document.querySelector(`.result__image-tree1`),
  ],
  state: new SceneObjectState({
    opacity: 0,
    width: 32,
    translateX: 147,
    translateY: 85,
  }),
  animation: new FrameAnimation({
    delay: 700, // 1:12.5
    frames: [0, 1],
    onRenderFrame({frame: opacity}, {state}) {
      state.opacity = opacity;
    },
  }),
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {SceneObjectState} state
   * @param {HTMLImageElement} image
   */
  onRenderObject(context, state, [image]) {
    state.synchronizeHeightIfNeeded(image);
    state.renderImage(context, image);
  },
});

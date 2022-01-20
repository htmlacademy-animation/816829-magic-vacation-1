import {SceneObject} from 'scenes/scene-object';
import {SceneObjectState} from 'scenes/scene-object-state';
import {FrameAnimation} from 'helpers/frame-animation';

export default new SceneObject({
  images: [
    document.querySelector(`.result__image-tree2`),
  ],
  state: new SceneObjectState({
    opacity: 0,
    width: 56,
    translateX: 114,
    translateY: 153,
    centerX: 0.5,
    centerY: 1,
  }),
  animation: new FrameAnimation({
    delay: 700, // 1:12.5
    duration: 300,
    onRenderFrame({progress}, {state}) {
      state.opacity = progress;
      state.scaleX = progress;
      state.scaleY = progress;
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

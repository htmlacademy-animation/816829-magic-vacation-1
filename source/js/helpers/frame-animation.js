import {MILLISECONDS_IN_SECOND} from './time-helpers';

const MIN_PROGRESS = 0;
const MAX_PROGRESS = 1;

const calculateFrameId = (fps, progress, duration) => {
  return Math.floor(progress * duration / MILLISECONDS_IN_SECOND * fps);
};

const calculateAnimationDuration = (fps, framesCount) => {
  return Math.ceil(MILLISECONDS_IN_SECOND / fps * (framesCount - 1));
};

export class FrameAnimation {
  /**
   * @param {bool} shouldPreloadFirstFrame
   * @param {number} delay
   * @param {number} duration
   * @param {number} fps
   * @param {any[]} frames
   * @param {function} onRenderFrame
   */
  constructor({
    shouldPreloadFirstFrame = false,
    delay = 0,
    duration,
    fps,
    frames,
    onRenderFrame,
  }) {
    this._shouldPreloadFirstFrame = shouldPreloadFirstFrame;
    this._delay = delay;
    this._fps = fps;
    this._frames = frames;
    this._duration = duration || calculateAnimationDuration(fps, frames.length);
    this._onRenderFrame = onRenderFrame;

    this._delayTimer = 0;
    this._startTimestamp = 0;
    this._latestAnimationFrameId = 0;
    this._latestRenderFrameId = undefined;

    this._onFrame = this._onFrame.bind(this);
  }

  getStartTimestamp() {
    return this._startTimestamp;
  }

  hasStarted() {
    return this.getStartTimestamp() > 0;
  }

  start(startTimestamp) {
    this._startTimestamp = startTimestamp || Date.now();
    if (this._shouldPreloadFirstFrame) {
      this._onFrame(false);
    }
    this._delayTimer = setTimeout(this._onFrame, this._delay);
  }

  stop() {
    this._startTimestamp = 0;

    if (this._delayTimer > 0) {
      clearTimeout(this._delayTimer);
      this._delayTimer = 0;
    }

    if (this._latestAnimationFrameId > 0) {
      cancelAnimationFrame(this._latestAnimationFrameId);
      this._latestAnimationFrameId = 0;
      this._latestRenderFrameId = undefined;
      this._startTimestamp = 0;
    }
  }

  _onFrame(shouldRequestNextFrameIfNeeded = true) {
    const elapsed = Date.now() - (this._startTimestamp + this._delay);
    const progress = Math.max(MIN_PROGRESS, Math.min(elapsed / this._duration, MAX_PROGRESS));

    const renderFrameId = calculateFrameId(this._fps, progress, this._duration);
    if (renderFrameId === this._latestRenderFrameId) {
      this._latestAnimationFrameId = requestAnimationFrame(this._onFrame);
      return;
    }

    this._onRenderFrame(this._frames ? this._frames[renderFrameId] : renderFrameId);
    this._latestRenderFrameId = renderFrameId;

    if (progress < MAX_PROGRESS) {
      if (shouldRequestNextFrameIfNeeded) {
        this._latestAnimationFrameId = requestAnimationFrame(this._onFrame);
      }
      return;
    }
    this._latestAnimationFrameId = 0;
  }
}

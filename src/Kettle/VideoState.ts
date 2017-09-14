import { Seconds } from './Types';
import { Maybe, nothing } from 'maybeasy';

export interface Timings {
  position: Maybe<Seconds>;
  duration: Maybe<Seconds>;
}

/**
 * Describes the object that can be used to fold over possible video states
 * and collapse them into a single value
 */
export interface Cata<T> {
  initialized: () => T;
  ready: (timings: Timings) => T;
  playing: (timings: Timings) => T;
  paused: (timings: Timings) => T;
  ended: (timings: Timings) => T;
  buffering: (timings: Timings) => T;
}

/**
 * Base type for states the video can be in
 */
export abstract class VideoState {
  readonly position: Maybe<Seconds>;
  readonly duration: Maybe<Seconds>;

  constructor(position: Maybe<Seconds>, duration: Maybe<Seconds>) {
    this.position = position;
    this.duration = duration;
  }

  abstract cata<T>(fold: Cata<T>): T;

  protected get timings() {
    return {
      position: this.position,
      duration: this.duration,
    };
  }
}

/**
 * This state indicates that the VideoState has been initialized, but is not
 * hooked up to any Video player yet.
 *
 * These are normalized across all possible video players.
 */
export class Initialized extends VideoState {
  constructor() {
    super(nothing(), nothing());
  }

  cata<T>(fold: Cata<T>): T {
    return fold.initialized();
  }
}

/**
 * The video is ready to play
 */
export class Ready extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.ready(this.timings);
  }
}

/**
 * This video is playing
 */
export class Playing extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.playing(this.timings);
  }
}

/**
 * The video paused
 */
export class Paused extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.paused(this.timings);
  }
}

/**
 * The video has ended
 */
export class Ended extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.ended(this.timings);
  }
}

/**
 * Thie video is buffering
 */
export class Buffering extends VideoState {
  cata<T>(fold: Cata<T>): T {
    return fold.buffering(this.timings);
  }
}

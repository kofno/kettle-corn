import { Seconds } from './Types';

/**
 * Describes that Catamorphism that can be used to collapse a VideoMessage
 * to a different type.
 */
export interface Cata<T> {
  play: () => T;
  pause: () => T;
  seekTo: (position: Seconds) => T;
}

/**
 * Base class for building a video message. Message Types are normalized
 * across video presentations.
 */
export abstract class VideoMessage {
  abstract cata<T>(fold: Cata<T>): T;
}

/**
 * Tells the video to start playing
 */
export class Play extends VideoMessage {
  cata<T>(fold: Cata<T>): T {
    return fold.play();
  }
}

/**
 * Tells the video to pause playback
 */
export class Pause extends VideoMessage {
  cata<T>(fold: Cata<T>): T {
    return fold.pause();
  }
}

/**
 * Tells the video to seek to a particular position
 */
export class SeekTo extends VideoMessage {
  readonly position: Seconds;

  constructor(position: Seconds) {
    super();
    this.position = position;
  }

  cata<T>(fold: Cata<T>): T {
    return fold.seekTo(this.position);
  }
}

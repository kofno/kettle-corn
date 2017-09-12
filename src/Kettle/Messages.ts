import { Seconds } from './Types';

export interface Cata<T> {
  play: () => T;
  pause: () => T;
  seekTo: (position: Seconds) => T;
}

export abstract class VideoMessage {
  abstract cata<T>(fold: Cata<T>): T;
}

export class Play extends VideoMessage {
  cata<T>(fold: Cata<T>): T {
    return fold.play();
  }
}

export class Pause extends VideoMessage {
  cata<T>(fold: Cata<T>): T {
    return fold.pause();
  }
}

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

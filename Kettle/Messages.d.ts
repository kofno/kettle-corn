import { Seconds } from './Types';
export interface Cata<T> {
    play: () => T;
    pause: () => T;
    seekTo: (position: Seconds) => T;
}
export declare abstract class VideoMessage {
    abstract cata<T>(fold: Cata<T>): T;
}
export declare class Play extends VideoMessage {
    cata<T>(fold: Cata<T>): T;
}
export declare class Pause extends VideoMessage {
    cata<T>(fold: Cata<T>): T;
}
export declare class SeekTo extends VideoMessage {
    readonly position: Seconds;
    constructor(position: Seconds);
    cata<T>(fold: Cata<T>): T;
}

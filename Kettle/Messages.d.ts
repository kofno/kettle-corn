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
export declare abstract class VideoMessage {
    abstract cata<T>(fold: Cata<T>): T;
}
/**
 * Tells the video to start playing
 */
export declare class Play extends VideoMessage {
    cata<T>(fold: Cata<T>): T;
}
/**
 * Tells the video to pause playback
 */
export declare class Pause extends VideoMessage {
    cata<T>(fold: Cata<T>): T;
}
/**
 * Tells the video to seek to a particular position
 */
export declare class SeekTo extends VideoMessage {
    readonly position: Seconds;
    constructor(position: Seconds);
    cata<T>(fold: Cata<T>): T;
}

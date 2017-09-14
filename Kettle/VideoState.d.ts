import { Seconds } from './Types';
import { Maybe } from 'maybeasy';
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
export declare abstract class VideoState {
    readonly position: Maybe<Seconds>;
    readonly duration: Maybe<Seconds>;
    constructor(position: Maybe<Seconds>, duration: Maybe<Seconds>);
    abstract cata<T>(fold: Cata<T>): T;
    protected readonly timings: {
        position: Maybe<number>;
        duration: Maybe<number>;
    };
}
/**
 * This state indicates that the VideoState has been initialized, but is not
 * hooked up to any Video player yet.
 *
 * These are normalized across all possible video players.
 */
export declare class Initialized extends VideoState {
    constructor();
    cata<T>(fold: Cata<T>): T;
}
/**
 * The video is ready to play
 */
export declare class Ready extends VideoState {
    cata<T>(fold: Cata<T>): T;
}
/**
 * This video is playing
 */
export declare class Playing extends VideoState {
    cata<T>(fold: Cata<T>): T;
}
/**
 * The video paused
 */
export declare class Paused extends VideoState {
    cata<T>(fold: Cata<T>): T;
}
/**
 * The video has ended
 */
export declare class Ended extends VideoState {
    cata<T>(fold: Cata<T>): T;
}
/**
 * Thie video is buffering
 */
export declare class Buffering extends VideoState {
    cata<T>(fold: Cata<T>): T;
}

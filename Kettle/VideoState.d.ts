import { Seconds } from './Types';
import { Maybe } from 'maybeasy';
export interface Timings {
    position: Maybe<Seconds>;
    duration: Maybe<Seconds>;
}
export interface Cata<T> {
    initialized: () => T;
    ready: (timings: Timings) => T;
    playing: (timings: Timings) => T;
    paused: (timings: Timings) => T;
    ended: (timings: Timings) => T;
    buffering: (timings: Timings) => T;
}
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
export declare class Initialized extends VideoState {
    constructor();
    cata<T>(fold: Cata<T>): T;
}
export declare class Ready extends VideoState {
    cata<T>(fold: Cata<T>): T;
}
export declare class Playing extends VideoState {
    cata<T>(fold: Cata<T>): T;
}
export declare class Paused extends VideoState {
    cata<T>(fold: Cata<T>): T;
}
export declare class Ended extends VideoState {
    cata<T>(fold: Cata<T>): T;
}
export declare class Buffering extends VideoState {
    cata<T>(fold: Cata<T>): T;
}

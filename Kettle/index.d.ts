import { VideoMessage } from './Messages';
import { Seconds } from './Types';
import { VideoState } from './VideoState';
import { Maybe } from 'maybeasy';
/**
 * The Kettle holds the video state. State is made observable by MobX.
 * Messages can also be sent to an observing video player using the
 * Kettle
 *
 *     const kettle = new Kettle();
 *     kettle.seekTo(30);
 *
 */
declare class Kettle {
    /** Current state of the Video */
    videoState: VideoState;
    /** Messages to send to the embedded player */
    videoMessage: VideoMessage[];
    setVideoState(state: VideoState): void;
    sendMessage(msg: VideoMessage): void;
    popMessage(): Maybe<VideoMessage>;
    seekTo(time: Seconds): void;
    play(): void;
    pause(): void;
}
export default Kettle;

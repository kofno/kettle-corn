import { VideoMessage } from './Messages';
import { Seconds } from './Types';
import { VideoState } from './VideoState';
import { Maybe } from 'maybeasy';
declare class Kettle {
    videoState: VideoState;
    videoMessage: VideoMessage[];
    setVideoState(state: VideoState): void;
    sendMessage(msg: VideoMessage): void;
    popMessage(): Maybe<VideoMessage>;
    seekTo(time: Seconds): void;
}
export default Kettle;

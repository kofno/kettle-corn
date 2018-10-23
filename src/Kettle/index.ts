import { fromNullable, Maybe } from 'maybeasy';
import { action, observable } from 'mobx';
import { Pause, Play, SeekTo, VideoMessage } from './Messages';
import { Seconds } from './Types';
import { Initialized, VideoState } from './VideoState';

/**
 * The Kettle holds the video state. State is made observable by MobX.
 * Messages can also be sent to an observing video player using the
 * Kettle
 *
 *     const kettle = new Kettle();
 *     kettle.seekTo(30);
 *
 */
class Kettle {
  /** Current state of the Video */
  @observable
  videoState: VideoState = new Initialized();

  /** Messages to send to the embedded player */
  @observable
  videoMessage: VideoMessage[] = [];

  @action
  setVideoState = (state: VideoState) => {
    this.videoState = state;
  };

  @action
  sendMessage = (msg: VideoMessage) => {
    this.videoMessage.push(msg);
  };

  @action
  popMessage = (): Maybe<VideoMessage> => {
    return fromNullable(this.videoMessage.pop());
  };

  @action
  seekTo = (time: Seconds) => {
    this.sendMessage(new SeekTo(time));
  };

  @action
  play = () => {
    this.sendMessage(new Play());
  };

  @action
  pause = () => {
    this.sendMessage(new Pause());
  };
}

export default Kettle;

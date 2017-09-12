import { observable, action } from 'mobx';
import { VideoMessage, SeekTo } from './Messages';
import { Seconds } from './Types';
import { VideoState, Initialized } from './VideoState';
import { Maybe, fromNullable } from 'maybeasy';

class Kettle {
  @observable videoState: VideoState = new Initialized();
  @observable videoMessage: VideoMessage[] = [];

  @action
  setVideoState(state: VideoState) {
    this.videoState = state;
  }

  @action
  sendMessage(msg: VideoMessage) {
    this.videoMessage.push(msg);
  }

  @action
  popMessage(): Maybe<VideoMessage> {
    return fromNullable(this.videoMessage.pop());
  }

  @action
  seekTo(time: Seconds) {
    this.sendMessage(new SeekTo(time));
  }
}

export default Kettle;

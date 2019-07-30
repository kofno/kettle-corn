/// <reference path="../vimeo.d.ts"/>
import { just, Maybe, nothing } from 'maybeasy';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import Kettle from './../Kettle';
import {
  Buffering,
  Ended,
  Initialized,
  Paused,
  Playing,
  Ready,
  VideoState,
} from './../Kettle/VideoState';
import loadVimeo from './Loader';

export interface Props {
  kettle: Kettle;
  id: string;
  className: string;
  videoId: number;
  height?: number;
  width?: number;
  maxheight?: number;
  maxwidth?: number;
}

const currentPos = (player: Vimeo.Player): Promise<Maybe<number>> =>
  player.getCurrentTime().then(just);

const currentDuration = (player: Vimeo.Player): Promise<Maybe<number>> =>
  player.getDuration().then(dur => (dur > 0 ? just(dur) : nothing<number>()));

const vimeoOptions = (props: Props): Vimeo.Options => {
  const { videoId, height, width, maxheight, maxwidth } = props;
  return {
    id: videoId,
    height,
    width,
    maxheight,
    maxwidth,
  };
};

export class _VimeoPlayer extends React.Component<Props, {}> {
  private container?: HTMLDivElement | null;
  private player: Vimeo.Player | undefined;

  registerKettleReactions = (player: Vimeo.Player) => {
    const { kettle } = this.props;
    reaction(
      () => kettle.videoMessage.length,
      (_length: number) => {
        kettle.popMessage().map(msg =>
          msg.cata({
            play: () => {
              player.play();
            },
            pause: () => {
              player.pause();
            },
            seekTo: pos => {
              player.setCurrentTime(pos);
            },
          })
        );
      }
    );
  };

  updateKettle = (
    player: Vimeo.Player,
    fn: (pos: Maybe<number>, dur: Maybe<number>) => VideoState
  ) => {
    const { kettle } = this.props;
    // prettier-ignore
    currentPos(player)
      .then(pos => currentDuration(player)
      .then(dur => kettle.setVideoState(fn(pos, dur))));
  };

  ready = (player: Vimeo.Player) => this.updateKettle(player, (pos, dur) => new Ready(pos, dur));

  handlePlay = (player: Vimeo.Player) => () =>
    this.updateKettle(player, (pos, dur) => new Playing(pos, dur));

  handlePause = (player: Vimeo.Player) => () =>
    this.updateKettle(player, (pos, dur) => new Paused(pos, dur));

  handleEnd = (player: Vimeo.Player) => () =>
    this.updateKettle(player, (pos, dur) => new Ended(pos, dur));

  handleTime = (player: Vimeo.Player) => () => {
    const { kettle } = this.props;
    this.updateKettle(player, (pos, dur) =>
      kettle.videoState.cata({
        playing: () => new Playing(pos, dur),
        paused: () => new Paused(pos, dur),
        ended: () => new Ended(pos, dur),
        buffering: () => new Buffering(pos, dur),
        ready: () => new Ready(pos, dur),
        initialized: () => new Initialized(),
      })
    );
  };

  componentDidMount() {
    loadVimeo.fork(
      err => console.warn(err),
      () => {
        if (!this.container) return;
        const player = new Vimeo.Player(this.container, vimeoOptions(this.props));
        player.ready().then(() => {
          this.registerKettleReactions(player);
          this.ready(player);
          player.on('play', this.handlePlay(player));
          player.on('pause', this.handlePause(player));
          player.on('timeupdate', this.handleTime(player));
          player.on('seeked', this.handleTime(player));
          player.on('ended', this.handleEnd(player));
        });
      }
    );
  }

  componentWillUnmount() {
    if (typeof this.player === 'undefined') return;
    this.player.off('play');
    this.player.off('pause');
    this.player.off('timeupdate');
    this.player.off('seeked');
    this.player.off('ended');
    this.player.unload();
    this.player = undefined;
  }

  refContainer = (container: HTMLDivElement | null) => {
    this.container = container;
  };

  render() {
    const { id, className } = this.props;
    return (
      <span>
        <div id={id} className={className} ref={this.refContainer} />
      </span>
    );
  }
}

export default observer(_VimeoPlayer);

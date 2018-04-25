import * as React from 'react';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { Maybe, nothing, just } from 'maybeasy';
import loadYouTube from './Loader';
import Kettle from './../Kettle';
import {
  VideoState,
  Buffering,
  Ready,
  Playing,
  Paused,
  Ended,
  Initialized,
} from './../Kettle/VideoState';

/**
 * Props for embedding a YouTube video
 */
export interface Props {
  id: string;
  className: string;
  videoId: string;
  kettle: Kettle;
}

/**
 * YouTube component for embedding a YouVideo in a page. Compatible with a
 * MobX Kettle.
 */
export class _YouTube extends React.Component<Props, {}> {
  private container?: HTMLDivElement | null;
  private player: YT.Player | undefined;
  private timer: NodeJS.Timer | undefined;

  /**
   * Maps YouTube states to a Kettle VideoStata
   */
  mapState = (state: YT.PlayerState, position: number, duration: Maybe<number>): VideoState => {
    switch (state) {
      case YT.PlayerState.BUFFERING:
        return new Buffering(just(position), duration);
      case YT.PlayerState.CUED:
        return new Ready(just(position), duration);
      case YT.PlayerState.ENDED:
        return new Ended(just(position), duration);
      case YT.PlayerState.PAUSED:
        return new Paused(just(position), duration);
      case YT.PlayerState.PLAYING:
        return new Playing(just(position), duration);
      case YT.PlayerState.UNSTARTED:
        return new Initialized();
    }
  };

  /**
   * Updates the state of the Kettle from the state of the player
   */
  updateKettle = (player: YT.Player) => {
    const { kettle } = this.props;
    const state = player.getPlayerState();
    const time = player.getCurrentTime();
    const d = player.getDuration();
    const duration = d === 0 ? nothing() : just(d);
    return kettle.setVideoState(this.mapState(state, time, duration));
  };

  /**
   * Register an observer that watchers for when messages are sent through the
   * Kettle to this component.
   */
  registerKettleReactions = (kettle: Kettle, player: YT.Player) => {
    reaction(
      () => kettle.videoMessage.length,
      (_length: number) => {
        kettle.popMessage().map(msg => {
          msg.cata({
            play: () => player.playVideo(),
            pause: () => player.pauseVideo(),
            seekTo: pos => player.seekTo(pos, true),
          });
        });
      },
    );
  };

  componentDidMount() {
    const { videoId, kettle } = this.props;
    loadYouTube.fork(
      err => console.warn(err),
      () => {
        if (!this.container) return;
        const player = new YT.Player(this.container, {
          videoId,
          playerVars: {
            enablejsapi: YT.JsApi.Enable,
          },
        });
        player.addEventListener('onReady', ({ target }) => {
          this.registerKettleReactions(kettle, target);
          this.updateKettle(target);
          // YouTube doesn't fire continual updates while playing or scrubbing
          this.timer = setInterval(() => {
            this.updateKettle(target);
          }, 250);
        });
        player.addEventListener('onStateChange', ({ target }) => this.updateKettle(target));
        this.player = player;
      },
    );
  }

  componentWillUnmount() {
    if (typeof this.timer !== 'undefined') {
      clearInterval(this.timer);
    }

    if (typeof this.player !== 'undefined') {
      this.player.destroy();
      this.player = undefined;
    }
  }

  refContainer = (container?: HTMLDivElement | null) => {
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

export default observer(_YouTube);

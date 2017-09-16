import * as React from 'react';
import Kettle from './../Kettle';
import { VideoState } from './../Kettle/VideoState';
import { Maybe } from 'maybeasy';
export interface Props {
    kettle: Kettle;
    id: string;
    className: string;
    videoId: number;
}
declare class VimeoPlayer extends React.Component<Props, {}> {
    private container;
    private player;
    registerKettleReactions: (player: Vimeo.Player) => void;
    updateKettle: (player: Vimeo.Player, fn: (pos: Maybe<number>, dur: Maybe<number>) => VideoState) => void;
    ready: (player: Vimeo.Player) => void;
    handlePlay: (player: Vimeo.Player) => () => void;
    handlePause: (player: Vimeo.Player) => () => void;
    handleEnd: (player: Vimeo.Player) => () => void;
    handleTime: (player: Vimeo.Player) => () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    refContainer: (container: HTMLDivElement | null) => void;
    render(): JSX.Element;
}
export default VimeoPlayer;

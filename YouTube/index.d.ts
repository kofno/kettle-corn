/// <reference types="youtube" />
import * as React from 'react';
import { Maybe } from 'maybeasy';
import Kettle from './../Kettle';
import { VideoState } from './../Kettle/VideoState';
export interface Props {
    id: string;
    className: string;
    videoId: string;
    kettle: Kettle;
}
declare class YouTube extends React.Component<Props, {}> {
    private container;
    mapState: (state: YT.PlayerState, position: number, duration: Maybe<number>) => VideoState;
    updateKettle: (player: YT.Player) => void;
    registerKettleReactions: (kettle: Kettle, player: YT.Player) => void;
    componentDidMount(): void;
    refContainer: (container: HTMLDivElement | null) => void;
    render(): JSX.Element;
}
export default YouTube;

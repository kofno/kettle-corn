/// <reference types="youtube" />
import * as React from 'react';
import { Maybe } from 'maybeasy';
import Kettle from './../Kettle';
import { VideoState } from './../Kettle/VideoState';
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
declare class YouTube extends React.Component<Props, {}> {
    private container;
    private player;
    /**
     * Maps YouTube states to a Kettle VideoStata
     */
    mapState: (state: YT.PlayerState, position: number, duration: Maybe<number>) => VideoState;
    /**
     * Updates the state of the Kettle from the state of the player
     */
    updateKettle: (player: YT.Player) => void;
    /**
     * Register an observer that watchers for when messages are sent through the
     * Kettle to this component.
     */
    registerKettleReactions: (kettle: Kettle, player: YT.Player) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    refContainer: (container: HTMLDivElement | null) => void;
    render(): JSX.Element;
}
export default YouTube;

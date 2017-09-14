import Task from 'taskarian';
declare global  {
    interface Window {
        onYouTubeIframeAPIReady?: () => void;
    }
}
/**
 * Lazy Task. When forked, embeds the YouTube Iframe API in the current web
 * page
 */
declare const loadYouTube: Task<undefined, undefined>;
export default loadYouTube;

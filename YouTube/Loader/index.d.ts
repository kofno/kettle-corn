import Task from 'taskarian';
declare global  {
    interface Window {
        onYouTubeIframeAPIReady?: () => void;
    }
}
declare const loadYouTube: Task<undefined, undefined>;
export default loadYouTube;

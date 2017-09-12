import Task from 'taskarian';
declare global  {
    interface Window {
        onYouTubeIframeReady?: () => void;
    }
}
declare const loadYouTube: Task<undefined, undefined>;
export default loadYouTube;

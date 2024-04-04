import { Task } from 'taskarian';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * Lazy Task. When forked, embeds the YouTube Iframe API in the current web
 * page
 */
const loadYouTube = new Task<undefined, undefined>((rejct, resolve) => {
  window.onYouTubeIframeAPIReady = () => resolve(undefined);

  if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
    resolve(undefined);
  } else {
    const uri = '//www.youtube.com/iframe_api';
    const script = document.createElement('script');
    script.src = uri;
    script.type = 'text/javascript';
    document.head.appendChild(script);
  }

  return () => {
    console.warn('Loading YouTube Iframe Api cannot be cancelled');
  };
});

export default loadYouTube;

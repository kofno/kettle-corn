import { Task } from 'taskarian';

const loadVimeo = new Task<undefined, undefined>((reject, resolve) => {
  if (typeof Vimeo !== 'undefined' && typeof Vimeo.Player !== 'undefined') {
    resolve(undefined);
  } else {
    const uri = '//player.vimeo.com/api/player.js';
    const script = document.createElement('script');
    script.src = uri;
    script.type = 'text/javascript';
    script.onload = () => {
      resolve(undefined);
    };
    document.head.appendChild(script);
  }

  return () => {
    console.warn('Loading Vimeo API cannot be cancelled');
  };
});

export default loadVimeo;

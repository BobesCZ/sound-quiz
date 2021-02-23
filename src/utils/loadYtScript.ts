export default function loadScript() {
  const scriptUrl = '//www.youtube.com/iframe_api';
  const globalName = 'YT';

  if (globalName && (window as any)[globalName])
    return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    let scr = document.createElement('script');
    scr.type = "text/javascript";
    scr.src = scriptUrl;
    document.getElementsByTagName('head')[0].appendChild(scr);
    scr.onload = (() => {
      !globalName || (window as any)[globalName] ?
        resolve() : reject(Error('window.' + globalName + ' undefined'));
    });
    scr.onerror = () => reject(Error('Error loading ' + globalName || scriptUrl));
  });
}

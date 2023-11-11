if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Registra el Service Worker de tu PWA
      navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then((registration) => {
          console.log('Service Worker de tu PWA registrado con éxito:', registration);
        })
        .catch((error) => {
          console.error('Error al registrar el Service Worker de tu PWA:', error);
        });
  
      // Registra el Service Worker de OneSignal
      navigator.serviceWorker.register('./OneSignalSDKWorker.js', { scope: './' })
        .then((registration) => {
          console.log('Service Worker de OneSignal registrado con éxito:', registration);
        })
        .catch((error) => {
          console.error('Error al registrar el Service Worker de OneSignal:', error);
        });
    });
  }
  

console.log('background');

const messageHandler = msg => {
  console.info('Handle message', { msg });
};

//

chrome.runtime.onConnect.addListener(port => {
  console.groupCollapsed('onConnect.addListener');
  console.info({ port });

  port.onMessage.addListener(messageHandler);

  console.groupEnd();
});

//

chrome.runtime.onDisconnect.addListener(port => {
  console.groupCollapsed('onDisconnect.addListener');
  console.info({ port });

  port.onMessage.removeListener(messageHandler);

  console.groupEnd();
});

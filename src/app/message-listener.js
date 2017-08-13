const port = chrome.runtime.connect({ name: 'my-message-port-name' });

/**
 * Register a listener for messages on the port
 */
port.onMessage.addListener(msg => {
  /**
   * Perform any stuff you want to perform on the incoming messages here
   */

  console.groupCollapsed('received message on port');
  console.log({ msg });
  console.groupEnd();
})

# LiveAgentEvents

## Summary

A small library for creating custom LiveAgent Chat buttons in a more modern and flexible way.

The LiveAgent chat API only has methods to set an html element with a given id to show or hide when chat is online. This is a major issue if you're trying to integrate with a virtual DOM library like that of React or Vue. LiveAgentEvents provides an event handler which will fire when a given button is online, decoupling the API from the DOM.

## 1. Setup

```javascript
new LiveAgentEvents({
  deploymentUrl: 'https://c.la.gus.salesforce.com/content/g/js/36.0/deployment.js',
  chatUrl: 'https://d.la.gus.salesforce.com/chat',
  deploymentId: '572B000000003KL',
  organizationId: '00DB00000000Rr8',
  buttonIds: ['573B0000000033Y']
});
```

## 2. Listen for online state
```js
window.addEventListener('sfButtonReady', (e) => {
  switch (e.detail.id) {
    case '573B0000000033Y':
      // do something when chat is online!
      break;
  }
});
```

## 3. Fire the chat window
Since the DOM and API are now decoupled, you'll need to fire the chat window manually.

```js
document.querySelector('#my-button').addEventListener('click', (e) => {
  window.liveagent.startChat('573B0000000033Y');
});
```


      

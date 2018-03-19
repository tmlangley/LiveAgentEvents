export default class LiveAgentEvents {
  constructor({deploymentUrl, chatUrl, deploymentId, organizationId, buttonIds}) {
    this.deploymentUrl = deploymentUrl;
    this.chatUrl = chatUrl;
    this.deploymentId = deploymentId;
    this.organizationId = organizationId;
    this.buttonIds = buttonIds;

    this.init();
  }

  init() {
    this.getScript(this.deploymentUrl, () => {
      this.showOnline();
      window.liveagent.init(this.chatUrl, this.deploymentId, this.organizationId);
    });
  }

  showOnline() {
    if (!window._laq) { window._laq = []; }
    const settings = {attributes: true};

    this.buttonIds.forEach((id) => {
      const button = document.createElement("div");
      button.style.display = 'none';
      button.dataset.sf = id;

      let observer = new MutationObserver((mutationList) => {
        if (mutationList[0].target.dataset.sf === id && mutationList[0].target.style.display !== 'none') {
          this.triggerOnlineEvent(id);
        }
        observer.disconnect();
      });
      observer.observe(button, settings);

      window._laq.push(() => {
        window.liveagent.showWhenOnline(id, button);
      });

    });
  }

  triggerOnlineEvent(id) {
    const event = new CustomEvent('sfButtonReady', {
      detail: { id }
    });
    window.dispatchEvent(event);
  }

  getScript(source, callback) {
    let script = document.createElement('script');
    const prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = function( _, isAbort ) {
      if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
        script.onload = script.onreadystatechange = null;
        script = undefined;

        if(!isAbort) { if(callback) callback(); }
      }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  }
};

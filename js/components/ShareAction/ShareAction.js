// https://github.com/GoogleChrome/web.dev/blob/603a318d27d3152ee4f8aabb56370219c2832258/src/lib/components/ShareAction/index.js

/**
 * @fileoverview Element that adds a share action on click
 */

import isWebShareSupported from "../../utils/browser/is-new-share";

/**
 * Renders share element. This simply adds behaviour to share,
 * and does not render any HTML
 *
 * @extends {HTMLElement}
 * @final
 */
export default class ShareAction extends HTMLElement {
  constructor() {
    super();
    const webShareIsSupported = isWebShareSupported();

    const label = webShareIsSupported ? "share" : "twitter";

    this.label = label;

    this.setAttribute("data-label", label);

    const handler = webShareIsSupported
      ? this.oneWebShare
      : this.onTwitterShare;

    this.addEventListener("click", handler.bind(this));
  }

  oneWebShare(e) {
    e.preventDefault();

    navigator.share({
      url: this.shareUrl,
      text: this.shareText,
    });
  }

  onTwitterShare(e) {
    e.preventDefault();

    window.open(this.shareUrl.toString(), "share-twitter", "width=550,height=235");
  }

  get shareUrl() {
    return this.label === "twitter" ? this.getAttribute("data-link") : window.location.href;
  }

  get shareText() {
    // check for a custom message
    const messageText = this.getAttribute("message");

    if (messageText && messageText.length) {
      return messageText;
    }

    return document.title;
  }
}

customElements.define("share-action", ShareAction);

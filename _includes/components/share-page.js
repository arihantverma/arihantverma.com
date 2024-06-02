// https://github.com/GoogleChrome/web.dev/blob/603a318d27d3152ee4f8aabb56370219c2832258/src/lib/components/ShareAction/index.js

/**
 * @fileoverview Element that adds a share action on click
 */

// https://github.com/GoogleChrome/web.dev/blob/603a318d27d3152ee4f8aabb56370219c2832258/src/lib/utils/web-share.js
function isWebShareSupported() {
  if (!('share' in window.navigator)) {
    return false;
  }

  /**
   * ensure that the user would be able to share a reference URL
   * This is part of Web Share Level 2, so feature-detect it:
   * https://bugs.chromium.org/p/chromium/issues/detail?id=903010
   */

  if ('canShare' in navigator) {
    const url = `https://${window.location.hostname}`;
    return window.navigator.canShare({ url });
  }

  return true;
 }

/**
 * Renders share element. This simply adds behaviour to share,
 * and does not render any HTML
 *
 * @extends {HTMLElement}
 * @final
 */
class ShareAction extends HTMLElement {
  constructor() {
    super();
    const webShareIsSupported = isWebShareSupported();
    const label = webShareIsSupported ? "share" : "twitter";
    this.label = label;

    const handler = webShareIsSupported
      ? this.oneWebShare
      : this.onTwitterShare;

    this.addEventListener("click", handler.bind(this));
  }

  oneWebShare(e) {
    alert('yeah')
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

if ("customElements" in window) {
  customElements.define("share-page", ShareAction);
}

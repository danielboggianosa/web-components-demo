class MyCustomComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
      </style>
      <slot></slot>
    `;
  }

  connectedCallback() {
    console.log("connected");
  }
  disconnectedCallback() {
    console.log("disconnected");
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute: ${name} changed from ${oldValue} to ${newValue}`);
  }
}
customElements.define("my-custom-component", MyCustomComponent);

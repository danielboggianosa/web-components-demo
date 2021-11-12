class MyUsersContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<div id="users"></div>`;
    this.users = this.shadowRoot.querySelector("#users");
  }

  connectedCallback() {
    this.users.innerHTML = "";
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        users.forEach((user) => {
          console.log(user);
          this.users.appendChild(this.createUser(user));
        });
      });
  }

  createUser({ name, username, email, phone, website }) {
    const user = document.createElement("my-user");
    user.setAttribute("name", name);
    user.setAttribute("username", username);
    user.setAttribute("email", email);
    user.setAttribute("phone", phone);
    user.setAttribute("website", website);
    return user;
  }
}
customElements.define("my-users-container", MyUsersContainer);

class MyUser extends HTMLElement {
  constructor(user) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 0.5rem;
                    border-bottom: 1px solid #eee;
                }
                .name {
                    font-weight: bold;
                }
            </style>
            <div id="user"></div>
        `;
    this.user = this.shadowRoot.querySelector("#user");
  }

  connectedCallback() {
    this.user.innerHTML = "";
    this.user.appendChild(this.createUser());
  }

  createUser() {
    const user = document.createElement("div");
    user.innerHTML = `
            <div class="name">${this.getAttribute("name")}</div>
            <div>${this.getAttribute("username")}</div>
            <div>${this.getAttribute("email")}</div>
            <div>${this.getAttribute("phone")}</div>
            <div>${this.getAttribute("website")}</div>
        `;
    return user;
  }
}
customElements.define("my-user", MyUser);

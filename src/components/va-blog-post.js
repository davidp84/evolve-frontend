import { LitElement, html, css } from "@polymer/lit-element";
import { render } from "lit-html";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import App from "../App";
// import UserAPI from "../UserAPI";
import Toast from "../Toast";

customElements.define(
  "va-blog-post",
  class BlogPost extends LitElement {
    constructor() {
      super();
    }

    static get properties() {
      return {
        id: {
          id: String,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        content: {
          type: String,
        },
        tags: {
          type: String,
        },
        image: {
          type: String,
        },
      };
    }

    firstUpdated() {
      super.firstUpdated();
    }

    moreInfoHandler() {
      // creates sl-dialog element
      const dialogEl = document.createElement("sl-dialog");
      // Adds class name
      dialogEl.className = "blogPost-dialog";

      // creates sl-dialog content
      const dialogContent = html`<style>
          .wrap {
            display: flex;
          }
          .image {
            width: 50%;
          }
          .image img {
            width: 100%;
          }
          .body {
            padding-left: 1em;
          }
        </style>
        <div class="wrap">
          <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
          </div>
          <div class="body">
            <h1>${this.title}</h1>
            <p>${this.description}</p>
            <p class="content">${this.content}</p>
            <p class="tags">Tags: <span>${this.tags}</span></p>
          </div>
        </div>`;

      render(dialogContent, dialogEl);

      // appends to document.body
      document.body.append(dialogEl);

      //shows sl-dialog
      dialogEl.show();

      // on hide delete dialogEl
      dialogEl.addEventListener("sl-after-hide", () => {
        dialogEl.remove();
      });
    }

    // async addFavHandler() {
    //   try {
    //     await UserAPI.addFavHaircut(this.id);
    //     Toast.show("Haircut added to favourites");
    //   } catch (err) {
    //     Toast.show(err, "error");
    //   }
    // }

    render() {
      return html`
        <style>
          .author {
            font-size: 0.9em;
            font-style: italic;
            opacitity: 0.8;
          }
        </style>

        <sl-card>
          <img slot="image" src="${App.apiBase}/images/${this.image}" />
          <p class="tags">Tags: <span>${this.tags}</span></p>
          <h2>${this.title}</h2>
          <h3>${this.description}</h3>

          <sl-button @click=${this.moreInfoHandler.bind(this)}
            >View Post</sl-button
          >
        </sl-card>
      `;
    }
  }
);

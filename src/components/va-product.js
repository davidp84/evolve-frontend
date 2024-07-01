import { LitElement, html, css } from "@polymer/lit-element";
import { render } from "lit-html";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import App from "../App";
// import UserAPI from "../UserAPI";
import Toast from "../Toast";

customElements.define(
  "va-product",
  class Product extends LitElement {
    constructor() {
      super();
    }

    static get properties() {
      return {
        id: {
          id: String,
        },
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        price: {
          type: String,
        },
        image: {
          type: String,
        },
        type: {
          type: String,
        },
        topic: {
          type: String,
        },
        length: {
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
      dialogEl.className = "product-dialog";

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
          .content {
            padding-left: 1em;
          }
          .length span {
            text-transform: uppercase;
            font-weight: bold;
          }
          .price {
            font-size: 1.5em;
            color: var(--brand-color);
          }
        </style>
        <div class="wrap">
          <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
          </div>
          <div class="content">
            <h1>${this.name}</h1>
            <p>${this.description}</p>
            <p class="price">$${this.price}</p>
            <p class="length">Length: <span>${this.length}</span></p>

            <sl-button @click=${this.addFavHandler.bind(this)}>
              <sl-icon slot="prefix" name="heart-fill"></sl-icon>
              Add to Favourites
            </sl-button>
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

    async addFavHandler() {
      try {
        // await UserAPI.addFavHaircut(this.id);
        Toast.show("Product added to favourites");
      } catch (err) {
        Toast.show(err, "error");
      }
    }

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
          <h2>${this.name}</h2>
          <h3>$${this.price}</h3>
          <sl-button @click=${this.moreInfoHandler.bind(this)}
            >More Info</sl-button
          >
        </sl-card>
      `;
    }
  }
);

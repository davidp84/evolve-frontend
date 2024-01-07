import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import Toast from "../../Toast";
import ProductAPI from "../../ProductAPI";

class ProductView {
  init() {
    document.title = "Products";
    this.products = null;
    this.render();
    Utils.pageIntroAnim();
    this.getProducts();
  }

  async getProducts() {
    try {
      this.products = await ProductAPI.getProducts();
      console.log("products = ", this.products);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <va-app-header
        title="Products"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <div class="products-grid">
          ${this.products == null
            ? html`<sl-spinner></sl-spinner>`
            : html`
                ${this.products.map(
                  (product) => html`
                    <va-product
                      class="product-card"
                      id="${product._id}"
                      name="${product.name}"
                      topic="${product.topic}"
                      type="${product.type}"
                      description="${product.description}"
                      price="${product.price}"
                      image="${product.image}"
                      length="${product.length}"
                    ></va-product>
                  `
                )}
              `}
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new ProductView();

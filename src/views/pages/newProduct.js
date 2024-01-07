import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import Toast from "../../Toast";
import ProductAPI from "../../ProductAPI";
import TypeAPI from "../../TypeAPI";
import TopicAPI from "../../TopicAPI";

class newProductView {
  init() {
    document.title = "New Product";
    this.types = null;
    this.topics = null;
    this.render();
    Utils.pageIntroAnim();
    this.getTypes();
    this.getTopics();
  }

  async getTypes() {
    try {
      this.types = await TypeAPI.getTypes();
      // console.log(this.types);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  async getTopics() {
    try {
      this.topics = await TopicAPI.getTopics();
      // console.log(this.topics);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  async newProductSubmitHandler(e) {
    console.log(e.detail.formData);
    e.preventDefault();
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.setAttribute("loading", "");
    const formData = e.detail.formData;

    try {
      await ProductAPI.newProduct(formData);
      Toast.show("Product added!");
      submitBtn.removeAttribute("loading");

      // reset form
      // reset text + textarea inputs
      const textInputs = document.querySelectorAll("sl-input, sl-textarea");
      if (textInputs)
        textInputs.forEach((textInput) => (textInput.value = null));

      // reset radio inputs
      const radioInputs = document.querySelectorAll("sl-radio");
      if (radioInputs)
        radioInputs.forEach((radioInput) =>
          radioInput.removeAttribute("checked")
        );

      // reset file input
      const fileInput = document.querySelector("input[type=file]");
      if (fileInput) fileInput.value = null;
    } catch (err) {
      Toast.show(err, "error");
      submitBtn.removeAttribute("loading");
    }
  }

  render() {
    const template = html`
      <va-app-header
        title="Add New Product"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <h1>New Product</h1>
        <sl-form class="page-form" @sl-submit=${this.newProductSubmitHandler}>
          <div class="input-group">
            <sl-input
              name="name"
              type="text"
              placeholder="Product Name"
              required
            ></sl-input>
          </div>

          <div class="input-group" style="margin-bottom: 2em;">
            <label>Type</label><br />
            <sl-radio-group label="Select type" value="type">
              ${this.types == null
                ? html` <sl-spinner></sl-spinner> `
                : html`
                    ${this.types.map(
                      (type) => html`
                        <sl-radio name="type" value="${type._id}"
                          >${type.name}</sl-radio
                        >
                      `
                    )}
                  `}
            </sl-radio-group>
          </div>

          <div class="input-group" style="margin-bottom: 2em;">
            <label>Topic</label><br />
            <sl-radio-group label="Select topic" value="topic">
              ${this.topics == null
                ? html` <sl-spinner></sl-spinner> `
                : html`
                    ${this.topics.map(
                      (topic) => html`
                        <sl-radio name="topic" value="${topic._id}"
                          >${topic.name}</sl-radio
                        >
                      `
                    )}
                  `}
            </sl-radio-group>
          </div>

          <div class="input-group">
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">$</span>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea
              name="description"
              rows="3"
              placeholder="Description"
            ></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br />
            <input type="file" name="image" />
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <sl-input
              name="length"
              placeholder="Length (in minutes)"
              type="number"
              required
            ></sl-input>
          </div>
          <sl-button type="primary" class="submit-btn" submit
            >Add Product</sl-button
          >
        </sl-form>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new newProductView();

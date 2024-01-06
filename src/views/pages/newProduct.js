import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";

class newProductView {
  init() {
    document.title = "New Product";
    this.render();
    Utils.pageIntroAnim();
  }

  async newProductSubmitHandler(e) {
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
          <div class="input-group">
            <sl-select placeholder="Category" multiple clearable required>
              <small>Type</small>
              <sl-option value="individual">Individual</sl-option>
              <sl-option value="group">Group</sl-option>
              <sl-option value="couple">Couples</sl-option>
              <sl-option value="family">Families</sl-option>
              <sl-divider></sl-divider>
              <small>Topic</small>
              <sl-option value="counselling">Counselling</sl-option>
              <sl-option value="supervision">Supervision</sl-option>
              <sl-option value="training">Training</sl-option>
            </sl-select>
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
            <label>Length (in minutes)</label><br />
            <sl-input name="length" type="number" required></sl-input>
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

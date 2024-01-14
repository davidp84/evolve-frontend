import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import Toast from "../../Toast";
import BlogPostAPI from "../../BlogPostAPI";

class newBlogPostView {
  init() {
    document.title = "New Blog Post";
    this.render();
    Utils.pageIntroAnim();
  }

  async newBlogPostSubmitHandler(e) {
    console.log(e.detail.formData);
    e.preventDefault();
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.setAttribute("loading", "");
    const formData = e.detail.formData;

    try {
      await BlogPostAPI.newBlogPost(formData);
      Toast.show("Blog Post added!");
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
        title="Add New Blog Post"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <h1>New Blog Post</h1>
        <sl-form class="page-form" @sl-submit=${this.newBlogPostSubmitHandler}>
          <div class="input-group">
            <sl-input
              name="title"
              type="text"
              placeholder="Blog Post Title"
              required
            ></sl-input>
          </div>
          <div class="input-group">
            <sl-textarea
              name="description"
              rows="3"
              placeholder="Description"
            ></sl-textarea>
          </div>
          <div class="input-group">
            <sl-textarea
              name="content"
              placeholder="Post"
              rows="10"
              resize="auto"
              required
            >
            </sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <sl-input
              name="tags"
              placeholder="Tags (comma separated)"
              type="text"
              required
            ></sl-input>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br />
            <input type="file" name="image" />
          </div>

          <sl-button type="primary" class="submit-btn" submit
            >Add Post</sl-button
          >
        </sl-form>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new newBlogPostView();

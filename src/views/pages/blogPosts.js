import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import Toast from "../../Toast";
import BlogPostAPI from "../../BlogPostAPI";

class BlogPostView {
  init() {
    document.title = "Blog Posts";
    this.blogPosts = null;
    this.render();
    Utils.pageIntroAnim();
    this.getBlogPosts();
  }

  async getBlogPosts() {
    try {
      this.blogPosts = await BlogPostAPI.getBlogPosts();
      console.log("BlogPosts = ", this.blogPosts);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <va-app-header
        title="BlogPosts"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <div class="products-grid">
          ${this.blogPosts == null
            ? html`<sl-spinner></sl-spinner>`
            : html`
                ${this.blogPosts.map(
                  (post) => html`
                    <va-blog-post
                      class="blogPost-card"
                      id="${post._id}"
                      title="${post.title}"
                      description="${post.description}"
                      content="${post.content}"
                      tags="${post.tags}"
                      image="${post.image}"
                    ></va-blog-post>
                  `
                )}
              `}
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new BlogPostView();

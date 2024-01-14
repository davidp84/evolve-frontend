import App from "./App";
import Auth from "./Auth";
import Toast from "./Toast";

class BlogPostAPI {
  async newBlogPost(formData) {
    // send fetch request
    const response = await fetch(`${App.apiBase}/blogPost`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
      body: formData,
    });

    // if response not ok
    if (!response.ok) {
      let message = "Problem adding blog post";
      if (response.status == 400) {
        const err = await response.json();
        message = err.message;
      }
      // throw error (exit this function)
      throw new Error(message);
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }

  async getBlogPosts() {
    // fetch the json data
    const response = await fetch(`${App.apiBase}/blogPost`, {
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
    });
    // console.log(response.json());
    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem getting blog posts");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }
}

export default new BlogPostAPI();

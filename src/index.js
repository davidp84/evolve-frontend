import App from "./App.js";

// components (custom web components)
import "./components/va-app-header";
import "./components/va-product";
import "./components/va-blog-post";

// styles
import "./scss/master.scss";

// app.init
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

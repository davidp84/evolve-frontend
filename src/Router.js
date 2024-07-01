// import views
import homeView from "./views/pages/home";
import fourOFourView from "./views/pages/404";
import signinView from "./views/pages/signin";
import signupView from "./views/pages/signup";
import profileView from "./views/pages/profile";
import editProfileView from "./views/pages/editProfile";
import newProductView from "./views/pages/newProduct";
import productsView from "./views/pages/products";
import newBlogPostView from "./views/pages/newBlogPost";
import blogPostsView from "./views/pages/blogPosts";

// define routes
const routes = {
  "/": homeView,
  404: fourOFourView,
  "/signin": signinView,
  "/signup": signupView,
  "/profile": profileView,
  "/editProfile": editProfileView,
  "/newProduct": newProductView,
  "/products": productsView,
  "/newBlogPost": newBlogPostView,
  "/blogPosts": blogPostsView,
};

class Router {
  constructor() {
    this.routes = routes;
  }

  init() {
    // initial call
    this.route(window.location.pathname);

    // on back/forward
    window.addEventListener("popstate", () => {
      this.route(window.location.pathname);
    });
  }

  route(fullPathname) {
    // extract path without params
    const pathname = fullPathname.split("?")[0];
    const route = this.routes[pathname];

    if (route) {
      // if route exists, run init() of the view
      this.routes[window.location.pathname].init();
    } else {
      // show 404 view instead
      this.routes["404"].init();
    }
  }

  gotoRoute(pathname) {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    this.route(pathname);
  }
}

// create appRouter instance and export
const AppRouter = new Router();
export default AppRouter;

// programmatically load any route
export function gotoRoute(pathname) {
  AppRouter.gotoRoute(pathname);
}

// allows anchor <a> links to load routes
export function anchorRoute(e) {
  e.preventDefault();
  const pathname = e.target.closest("a").pathname;
  AppRouter.gotoRoute(pathname);
}
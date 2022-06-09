import { createApp } from "vue";
import App from "./App.vue";
import routes from "./routes";

console.log("routes: ", routes);

window.addEventListener("popstate", () => {
  console.log(location);
});

const app = createApp(App);

app.mount("#app");

import App from "./App";
import Auth from "./Auth";
import Toast from "./Toast";

class TopicAPI {
  async newTopic(formData) {
    // send fetch request
    console.log("API", formData);
    const response = await fetch(`${App.apiBase}/topic`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
      body: formData,
    });

    // if response not ok
    if (!response.ok) {
      let message = "Problem adding topic";
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

  async getTopics() {
    // fetch the json data
    const response = await fetch(`${App.apiBase}/topic`, {
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
    });

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem getting topics");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }
}

export default new TopicAPI();

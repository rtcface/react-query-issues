import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:
      "Bearer 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",
  },
});

export const NODE_API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://cheeta-backend.onrender.com/api"
    : "http://localhost:8080/api";

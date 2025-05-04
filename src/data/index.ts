export const BASE_URL2 = () => {
  const environment = process.env.NODE_ENV;
  // console.log(environment)
  const baseUrl =
    environment === "production"
      ? "wss://exandoe-backend-production.up.railway.app/api/v1"
      : "ws://localhost:8080/api/v1";
  return baseUrl;
}
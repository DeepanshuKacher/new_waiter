const IS_PRODUCTION = false;

export const constants = {
  IS_DEVELOPMENT: !IS_PRODUCTION,
  mqttSubsribeTopic: (restaurantId: string) => `${restaurantId}/tables/#`,
  development_server_url: "http://192.168.105.48:5000/",
  production_server_url: "https://api.eatrofoods.com/",
};

const IS_PRODUCTION = true;

export const constants = {
  IS_DEVELOPMENT: !IS_PRODUCTION,
  mqttSubsribeTopic: (restaurantId: string) => `${restaurantId}/tables/#`,
  development_server_url: "http://192.168.201.14:5000/",
  production_server_url: "https://api.eatrofoods.com/",
};

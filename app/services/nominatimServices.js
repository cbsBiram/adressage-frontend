import http from "./httpServices";

const apiEndpoint1 = "https://nominatim.openstreetmap.org/reverse";
const apiEndpoint2 = "https://nominatim.openstreetmap.org/search";

export function reverseGeolocation(
  lat,
  lon,
  email = "ibrahimabiram@gmail.com",
  format = "jsonv2",
  addressdetails = 1
) {
  return http.get(apiEndpoint1, {
    params: {
      email,
      format,
      lat,
      lon,
      addressdetails,
    },
    headers: { "User-Agent": "myhali" },
  });
}

export function getDistrictLocation(format, query) {
  return http.get(apiEndpoint2, {
    params: {
      format,
      q: query,
    },
  });
}

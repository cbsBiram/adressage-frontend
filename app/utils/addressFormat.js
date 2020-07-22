 export default formatAddress = (addressDetails) => {
     let {
         country,
         state: region,
         region: region2,
         county,
         city,
         locality,
         town,
         suburb,
         road,
         street,
         district,
         hamlet,
         village
     } = addressDetails;

     if (!region) {
         if (region2) region = region2
         else {
             region = city;
         }
     }

     if (!city) {
         if (county) city = county;
         else if (town) city = town;
         else if (locality) city = locality;
         else city = village
     }

     if (!suburb) {
         if (road) suburb = road;
         else if (!road && street) suburb = street;
         else suburb = district;
     };

     if (!road) {
         if (street) road = street;
         else if (!street && district) road = district
         else if (!district && suburb) road = suburb
         else road = hamlet
     }

     return {
         country,
         region,
         city,
         road
     }
 }
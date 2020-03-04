 export default formatAddress = (addressDetails) => {
     let {
         country,
         state: region,
         county,
         city,
         locality,
         town,
         suburb,
         road,
         street,
         district
     } = addressDetails;

     if (!region) region = county;

     if (!city) {
         if (town) city = town;
         else city = locality;
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
     }

     return {
         country,
         region,
         city,
         road
     }
 }
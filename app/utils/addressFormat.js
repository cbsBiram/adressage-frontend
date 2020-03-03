 export default formatAddress = (addressDetails, addressType) => {
     let {
         country,
         //  country_code,
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
         if (road) suburb = road
         else if (!road && street) suburb = street;
         else suburb = district;
     };

     return {
         country,
         //  country_code,
         region,
         city,
         suburb
     }
 }
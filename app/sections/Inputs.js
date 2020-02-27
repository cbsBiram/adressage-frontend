import React from "react";
import { Input } from "react-native-elements";

const Inputs = ({ inputStyle, addressName, code }) => {
  return (
    <>
      <Input
        containerStyle={{ width: undefined, height: undefined }}
        inputStyle={inputStyle}
        readOnly
        value={addressName}
        label="Localité"
        labelStyle={{ color: "#ffffff", marginTop: 15, fontSize: 20 }}
      />
      <Input
        containerStyle={{ width: undefined, height: undefined }}
        inputStyle={inputStyle}
        value={code}
        label="Votre code sera généré ici..."
        labelStyle={{ color: "#ffffff", marginTop: 15, fontSize: 20 }}
      />
    </>
  );
};

export default Inputs;

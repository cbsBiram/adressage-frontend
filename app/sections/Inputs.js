import React from "react";
import { Input } from "react-native-elements";

const Inputs = ({ inputStyle, addressName, code }) => {
  return (
    <>
      <Input
        containerStyle={{ width: undefined, height: undefined }}
        inputStyle={inputStyle}
        readOnly
        selection={{ start: 0 }}
        value={addressName}
        label="Localité"
        labelStyle={{ color: "#ffffff", marginTop: 15, fontSize: 15 }}
      />
      <Input
        containerStyle={{ width: undefined, height: undefined }}
        inputStyle={inputStyle}
        value={code}
        label="Code"
        labelStyle={{ color: "#ffffff", marginTop: 15, fontSize: 15 }}
      />
    </>
  );
};

export default Inputs;

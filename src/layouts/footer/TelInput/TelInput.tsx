import React from "react";
import { Button } from "@components/button/button";

interface TelInputProps {
  btnTitle: string;
  inputPlaceholder: string;
  props?: any;
}

const TelInput: React.FC<TelInputProps> = ({btnTitle, inputPlaceholder, ...props}) => {
  return (
    <div className="input-group mb-3 mt-3" style={{borderRadius: '0.5rem'}} {...props}>
      <div className="input-group-prepend">
        <Button style={{borderRadius: '.5rem'}}>
          {btnTitle}
        </Button>
      </div>
      <input
        type="tel"
        className="form-control"
        placeholder={inputPlaceholder}
        style={{borderColor: '#516EFF', borderRadius: '0.5rem', textAlign: 'center'}}
      />
    </div>
  );
};

export default TelInput;

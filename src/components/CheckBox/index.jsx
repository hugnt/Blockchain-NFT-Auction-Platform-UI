import React from 'react'
import Checkbox from "react-custom-checkbox";
import { FaCircle } from "react-icons/fa";

export default function CheckBox(props) {
  let {className,label} = props;
  return (
    <Checkbox
          icon={<FaCircle color="#fff" size={"0.4em"} />}
          borderColor="#fff"
          borderWidth="1px"
          label={label}
          labelClassName="text-fog-2"
          labelStyle={{ marginLeft: 8 }}
          className="bg-fog-1"
        />
  )
}

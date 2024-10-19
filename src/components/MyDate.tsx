import { ErrorMessage, useField } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
  classnamelabel?: string;
  classnameinput?: string;
  name: string;
  value: string;
  label: string;
  onBlur: () => void;
  id: string;
}

const MyDate = ({
  label,
  classnameinput,
  classnamelabel,
  onBlur,
  id,
  ...props
}: Props) => {
  const [field, , helpers] = useField(props);
  // const newField = {
  //   ...field,
  //   value: new Date(field.value),
  // };

  const { setValue } = helpers;
  const [startDate, setStartDate] = useState(field.value);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="date" className={classnamelabel}>
        {label}
      </label>
      <DatePicker
        className={`${classnameinput} `}
        selected={startDate}
        shouldCloseOnSelect={true}
        showTimeSelect
        closeOnScroll={true}
        dateFormat="MMM d, yyyy h:mm aa"
        onChange={(date) => {
          const value = date as Date;
          setStartDate(value);
          setValue(value);
        }}
        onBlur={onBlur}
        id={id}
      />
      <ErrorMessage name={props.name} />
    </div>
  );
};

export default MyDate;

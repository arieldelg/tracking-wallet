import { ErrorMessage, useField } from "formik";

type Props = {
  name: string;
  label: string;
  classnamelabel?: string;
  classnameinput?: string;
  placeholder?: string;
  onBlur: () => void;
  classnameerror?: string;
  id: string;
};

const MyTextArea = ({
  label,
  classnameerror,
  classnamelabel,
  classnameinput,
  ...props
}: Props) => {
  const [field] = useField(props);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className={classnamelabel}>
        {label}
      </label>
      <textarea {...field} className={classnameinput} {...props} />
      <ErrorMessage
        name={props.name}
        component="span"
        className={classnameerror}
      />
    </div>
  );
};

export default MyTextArea;

import { ErrorMessage, useField } from "formik";

interface Props {
  name: string;
  placeholder?: string;
  classnamelabel?: string;
  classnameinput?: string;
  children: React.ReactNode;
  label?: string;
  onBlur?: () => void;
  classnameerror?: string;
  id: string;
}

const MySelect = ({
  label,
  classnameerror,
  classnameinput,
  classnamelabel,
  ...props
}: Props) => {
  const [field] = useField(props);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className={classnamelabel}>
        {label}
      </label>
      <select className={classnameinput} {...field} {...props} />

      <ErrorMessage
        name={props.name}
        component="span"
        className={classnameerror}
      />
    </div>
  );
};

export default MySelect;

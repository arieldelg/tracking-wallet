import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  classNameLabel?: string;
  classNameContainer?: string;
  classNmeIcon?: string;
};

const MyNewEmptySection = (props: Props) => {
  const classNameContainer = twMerge(`
        w-full flex flex-col items-center justify-center space-y-5 text-gray-500 ${props.classNameContainer}
        `);
  const classNameLabel = twMerge(`
        text-xl ${props.classNameLabel}
        `);
  const classNameIcon = twMerge(`
        w-20 ${props.classNmeIcon}
        `);
  return (
    <div className={classNameContainer}>
      <CloudArrowUpIcon className={classNameIcon} />
      <p className={classNameLabel}>{props.label}</p>
    </div>
  );
};

export default MyNewEmptySection;

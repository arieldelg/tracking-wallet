import { useCallback, useEffect, useState } from "react";
import { NoteProps } from "../interface/walletApp";

interface Props {
  data: NoteProps[];
  initiValueFilter?: string;
  getFirstValueFilter?: (value: NoteProps) => void;
}

interface FilterProps {
  value?: string;
  activeFirstValue?: boolean;
}

const useFilterData = ({
  data,
  getFirstValueFilter,
  initiValueFilter,
}: Props): {
  filterBy: ({ value, activeFirstValue }: FilterProps) => void;
  filterNote: NoteProps[];
} => {
  const [filterNote, setFilterNote] = useState<NoteProps[]>(data);
  console.log(initiValueFilter);
  const filterBy = useCallback(
    ({ value = initiValueFilter, activeFirstValue = false }: FilterProps) => {
      switch (value) {
        case "income":
        case "expense":
          {
            const filter = data.filter(
              (element) => element.typeCurrency === value
            );

            setFilterNote(filter);
            if (activeFirstValue && getFirstValueFilter)
              getFirstValueFilter(filter[0]);
          }
          break;
        case "quantity":
          {
            const array = [...data];
            const sortedBills = array.sort((a, b) =>
              a.quantity < b.quantity ? -1 : a.quantity > b.quantity ? 1 : 0
            );
            setFilterNote(sortedBills);
            if (activeFirstValue && getFirstValueFilter)
              getFirstValueFilter(sortedBills[0]);
          }
          break;
        case "quantity2":
          {
            const array = [...data];
            const sortedBills = array.sort((a, b) =>
              a.quantity < b.quantity ? 1 : a.quantity > b.quantity ? -1 : 0
            );
            setFilterNote(sortedBills);
            if (activeFirstValue && getFirstValueFilter)
              getFirstValueFilter(sortedBills[0]);
          }
          break;
        default:
          console.log("reset");
          break;
      }
    },
    [data, getFirstValueFilter, initiValueFilter]
  );

  useEffect(() => {
    setFilterNote(data);
  }, [data]);

  useEffect(() => {
    return filterBy({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // method
    filterBy,

    // state
    filterNote,
  };
};

export default useFilterData;

import { useState } from 'react';
import RitualQuiz from './RitualQuiz';
import SelectRituals from './SelectRituals';

export default function SelectPage() {
  const [page, setPage] = useState(1);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  const handleSelectedElement = (e: string) => {
    const isElemAlreadySelected = selectedElements.findIndex((elem) => elem === e) !== -1;

    if (isElemAlreadySelected) {
      const arrWithoutElement = selectedElements.filter((elem) => elem !== e);
      setSelectedElements(arrWithoutElement);
    } else {
      setSelectedElements([...selectedElements, e]);
    }
  };
  const nextPage = () => {
    if (page === 3) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };
  switch (page) {
    case 1:
      return <SelectRituals nextPage={nextPage} handleSelectedElement={handleSelectedElement} />;
    case 2:
      return <RitualQuiz selectedElements={selectedElements} />;
    default:
      return <SelectRituals nextPage={nextPage} handleSelectedElement={handleSelectedElement} />;
  }
}

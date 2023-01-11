import styles from '@styles/main.module.sass';
import Image from 'next/image';
import { forwardRef } from 'react';
import useNewRitual from '../../../lib/hooks/useNewRitual';
import isLengthGreaterThanZero from '../../../lib/utils/isLengthGreaterThanZero';
import elements from '../../../public/data/elements.json';

const NewRitualForm = forwardRef<HTMLInputElement>((_, ref) => {
  const {
    handleNewRitual, handleInput, base64Img, statusMsg,
  } = useNewRitual();
  return (
    <div className={styles['add-new-ritual-container']}>
      {isLengthGreaterThanZero(base64Img) && (
        <Image width={150} height={150} src={base64Img} alt="ritual" />
      )}
      <div className={styles['add-new-ritual-form']}>
        <label htmlFor="ritual-name">
          nome:
          <input type="text" id="ritual-name" name="name" onChange={handleInput} spellCheck />
        </label>
        {elements.map((element) => (
          <label htmlFor={element} key={element}>
            {element}
            <input id={element} type="radio" value={element} name="type" onChange={handleInput} />
          </label>
        ))}
        <label htmlFor="ritual-image" className={styles['add-new-ritual-upload-btn']}>
          upload image
          <input
            type="file"
            id="ritual-image"
            style={{ display: 'none' }}
            onChange={handleInput}
            ref={ref}
            accept="image/jpeg"
          />
        </label>
        <button
          type="button"
          onClick={handleNewRitual}
          className={styles['add-new-ritual-save-btn']}
        >
          salvar
        </button>
        {statusMsg.length > 0 && (
          <p>
            {'* '}
            {statusMsg}
          </p>
        )}
      </div>
    </div>
  );
});

export default NewRitualForm;

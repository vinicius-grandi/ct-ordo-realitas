import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@styles/main.module.sass';
import api from '@ct-ordo-realitas/app/firebase/clientApp';

type Ritual = {
  name: string;
  type: string;
};

export default function NewRitualPage() {
  const [image, setImage] = useState<File>();
  const [base64Img, setBase64Img] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const initialStateRitual: Ritual = {
    name: '',
    type: '',
  };
  const [ritual, setRitual] = useState(initialStateRitual);
  useEffect(() => {
    if (image instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          setBase64Img(reader.result);
        }
      };
    }
  }, [image]);
  const handleName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setRitual({ ...ritual, name: value });
  };
  const handleType = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setRitual({ ...ritual, type: value });
  };

  async function getImagePathFromUploaded() {
    const body = new FormData();
    body.append('image', base64Img);
    const response = await fetch('../api/rituais/adicionar', {
      method: 'post',
      body,
    });
    const { imagePath: result } = await response.json();
    return result;
  }
  const isLengthGreaterThanZero = (s: string) => s.length > 0;
  const handleNewRitual = async () => {
    console.log('alo');
    if (
      isLengthGreaterThanZero(base64Img)
      && isLengthGreaterThanZero(ritual.name)
      && isLengthGreaterThanZero(ritual.type)
    ) {
      try {
        await api.setRitual({
          ...ritual,
          imagePath: await getImagePathFromUploaded(),
        });
        setStatusMsg('ritual upload successful');
      } catch (error) {
        console.error(error);
        setStatusMsg('ritual upload failed');
      }
    } else {
      setStatusMsg('please fill out all inputs');
    }
  };
  return (
    <div className={styles['add-new-ritual-bg']}>
      <h1 className={styles['debian-title']}>Rituais - Adicionar novo Ritual</h1>
      <div className={styles['add-new-ritual-container']}>
        { isLengthGreaterThanZero(base64Img) && <Image width={150} height={150} src={base64Img} alt="ritual" /> }
        <div className={styles['add-new-ritual-form']}>
          <label htmlFor="ritual-name">
            nome:
            <input type="text" id="ritual-name" onChange={handleName} />
          </label>
          <label htmlFor="ritual-type">
            tipo:
            <input type="text" id="ritual-type" onChange={handleType} />
          </label>
          <label htmlFor="ritual-image" className={styles['add-new-ritual-upload-btn']}>
            upload image
            <input
              type="file"
              id="ritual-image"
              style={{ display: 'none' }}
              onChange={(ev) => {
                if (ev.target.files !== null) {
                  const file = ev.target.files[0];
                  setImage(file);
                }
              }}
              accept="image/png"
            />
          </label>
          <button type="button" onClick={handleNewRitual} className={styles['add-new-ritual-save-btn']}>
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
    </div>
  );
}

export const AddNewRitual = NewRitualPage;

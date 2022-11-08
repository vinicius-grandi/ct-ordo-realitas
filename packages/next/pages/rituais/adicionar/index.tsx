import { ChangeEvent, useEffect, useState } from 'react';
import api from '@ct-ordo-realitas/app/firebase/clientApp';

type Ritual = {
  name: string;
  type: string;
};

export default function NewRitualPage() {
  const [image, setImage] = useState<File>();
  const [imagePath, setImagePath] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const initialStateRitual: Ritual = {
    name: '',
    type: '',
  };
  const [ritual, setRitual] = useState(initialStateRitual);
  useEffect(() => {
    async function uploadImage() {
      if (image instanceof File) {
        const body = new FormData();
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
          if (typeof reader.result === 'string') {
            body.append('image', reader.result);
            const response = await fetch('../api/rituais/adicionar', {
              method: 'post',
              body,
            });
            const { imagePath: imgPath } = await response.json();
            setImagePath(imgPath);
          }
        };
      }
    }
    void uploadImage();
  }, [image]);
  const handleName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setRitual({ ...ritual, name: value });
  };
  const handleType = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setRitual({ ...ritual, type: value });
  };

  const handleNewRitual = async () => {
    try {
      await api.setRitual({ ...ritual, imagePath });
      setStatusMsg('ritual upload successful');
    } catch (error) {
      console.error(error);
      setStatusMsg('ritual upload failed');
    }
  };
  return (
    <div>
      <h1>Rituais - Adicionar novo Ritual</h1>
      <label htmlFor="ritual-name">
        nome:
        <input type="text" id="ritual-name" onChange={handleName} />
      </label>
      <label htmlFor="ritual-type">
        tipo:
        <input type="text" id="ritual-type" onChange={handleType} />
      </label>
      <label htmlFor="ritual-image">
        imagem:
        <input
          type="file"
          id="ritual-image"
          onChange={(ev) => {
            if (ev.target.files !== null) {
              const file = ev.target.files[0];
              setImage(file);
            }
          }}
          accept="image/png"
        />
      </label>
      {statusMsg.length > 0 && <p>{statusMsg}</p>}
      <button
        type="button"
        onClick={handleNewRitual}
      >
        salvar
      </button>
    </div>
  );
}

export const AddNewRitual = NewRitualPage;

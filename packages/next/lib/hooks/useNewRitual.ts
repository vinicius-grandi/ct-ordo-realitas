import { ChangeEvent, useEffect, useState } from 'react';
import { Ritual } from '../../components/rituals/RitualQuiz';
import isLengthGreaterThanZero from '../utils/isLengthGreaterThanZero';

const useImage = (image?: File): string => {
  const [base64Img, setBase64Img] = useState('');
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
  return base64Img;
};

export default function useNewRitual() {
  const initialStateRitual: Ritual = {
    name: '',
    type: '',
    imagePath: '',
  };
  const [ritual, setRitual] = useState(initialStateRitual);
  const [statusMsg, setStatusMsg] = useState('');
  const [image, setImage] = useState<File>();
  const base64Img = useImage(image);
  async function setNewRitual() {
    const body = new FormData();
    body.append('image', base64Img);
    body.append('ritual', JSON.stringify(ritual));
    const response = await fetch('../api/rituais/adicionar', {
      method: 'post',
      body,
    });
    const { imagePath: result } = await response.json();
    return result;
  }
  const handleNewRitual = async () => {
    setStatusMsg('loading...');
    if (
      isLengthGreaterThanZero(base64Img) &&
      isLengthGreaterThanZero(ritual.name) &&
      isLengthGreaterThanZero(ritual.type)
    ) {
      try {
        await setNewRitual();
        setStatusMsg('ritual upload successful');
      } catch (error) {
        setStatusMsg('ritual upload failed');
      }
    } else {
      setStatusMsg('please fill out all inputs');
    }
  };

  const handleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.name in ritual) {
      setRitual({
        ...ritual,
        [ev.target.name]: ev.target.value,
      });
    } else if (ev.target.files !== null) {
      const file = ev.target.files[0];
      setImage(file);
    }
  };

  return {
    statusMsg, handleNewRitual, base64Img, handleInput,
  };
}

import { useEffect, useState } from 'react';

export default function NewRitualPage() {
  const [image, setImage] = useState<File>();
  useEffect(() => {
    async function uploadImage() {
      if (image instanceof File) {
        const body = new FormData();
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
          if (typeof reader.result === 'string') {
            body.append('image', reader.result);
            await fetch('../api/rituais/adicionar', {
              method: 'post',
              body,
            });
          }
        };
      }
    }
    void uploadImage();
  }, [image]);
  return (
    <div>
      <input
        type="file"
        onChange={(ev) => {
          if (ev.target.files !== null) {
            const file = ev.target.files[0];
            setImage(file);
          }
        }}
        accept="image/png"
      />
    </div>
  );
}

export const AddNewRitual = NewRitualPage;

type Options = {
  apiKey?: string;
  imagePath?: string;
  name?: string;
  expiration?: number;
  imageUrl?: string;
  base64string?: string;
};

type ImgbbResponse = {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  size: number;
  time: string;
  expiration: string;
  image: {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  };
  thumb: {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  };
  medium: {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
  };
  delete_url: string;
};

declare module 'imgbb-uploader' {
  export default function setImage(options: Options): Promise<ImgbbResponse>;
}

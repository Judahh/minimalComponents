import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const exists = (array: Array<any>, value) => {
  let find = array?.findIndex?.((element) => element === value);
  let has = find != undefined && find > -1;
  return has;
};

const useQuery = () => {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  return query;
};

const urltoFile = async (url, filename, mimeType) => {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
};

const getImage = async (file) => {
  const image = new Image();
  image.src = URL.createObjectURL(file);
  return new Promise((resolve) => {
    image.onload = (a: any) => {
      const imgData = {
        width: a?.currentTarget?.width,
        height: a?.currentTarget?.height,
        img: image,
      };
      resolve(imgData);
    };
  });
};

const resizeImage = async (
  originalFile,
  targetFileSizeKb = (originalFile.size || 0) / 1000
) => {
  // console.log('resizeImage');
  let file = originalFile;

  let currentSize = (originalFile.size || 0) / 1000;
  let targetSize = targetFileSizeKb;

  let factor = Math.sqrt(targetSize / currentSize);

  // console.log('Factor:', factor);
  // console.log('sizes:', currentSize, targetSize);

  return new Promise(async (resolve) => {
    if (currentSize <= targetSize) return resolve(originalFile); // File is already smaller
    const url = await URL.createObjectURL(file);
    const canvas = document.createElement('canvas');
    const img = new Image();
    //console.log(file);
    img.src = url;
    img.onload = async (nImg) => {
      const target: any = nImg?.currentTarget;
      if (canvas && target?.width && target?.height) {
        const width = target.width;
        const height = target.height;

        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        if (context) {
          const image: any = await getImage(file);
          context.drawImage(image.img, 0, 0);

          const newWidth = Math.round(width * factor);
          const newHeight = Math.round(height * factor);

          canvas.width = newWidth;
          canvas.height = newHeight;
          context.scale(newWidth / width, newHeight / height);

          context.drawImage(image.img, 0, 0);

          file = await urltoFile(
            canvas.toDataURL(),
            originalFile.type.replace('/', '.'),
            originalFile.type
          );
          // console.log('NEW:', file.size / 1000);
        }
      }

      return resolve(file);
    };
  });
};

export { exists, useQuery, resizeImage, urltoFile, getImage };

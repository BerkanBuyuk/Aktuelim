import {URLConfig, CloudConfig, CloudinaryImage} from '@cloudinary/url-gen';
import {
  CLOUDINARY_CLOUDNAME,
  CLOUDINARY_APIKEY,
  CLOUDINARY_APISECRET,
  CATEGORIES_CLOUDINARY,
  MARKETS_CLOUDINARY,
} from '@env';

const cloudConfig = () => {
  return new CloudConfig({
    cloudName: CLOUDINARY_CLOUDNAME,
    apiKey: CLOUDINARY_APIKEY,
    apiSecret: CLOUDINARY_APISECRET,
  });
};

const urlConfig = () => {
  return new URLConfig({secure: true});
};

export const categoriesCloudinaryImage = imageName => {
  return new CloudinaryImage(
    `${CLOUDINARY_CLOUDNAME}/${CATEGORIES_CLOUDINARY}/${imageName}`,
    cloudConfig(),
    urlConfig(),
  );
};

export const marketsCloudinaryImage = imageName => {
  return new CloudinaryImage(
    `${CLOUDINARY_CLOUDNAME}/${MARKETS_CLOUDINARY}/${imageName}`,
    cloudConfig(),
    urlConfig(),
  );
};

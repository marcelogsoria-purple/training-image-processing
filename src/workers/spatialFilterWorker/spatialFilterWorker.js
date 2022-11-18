import { filterImage } from '../../utils';

const spatialFilter = (event) => {
  const { kernel, image, xOff, yOff } = event.data;

  const newImage = filterImage(kernel, image);

  // eslint-disable-next-line no-restricted-globals
  self.postMessage({ newImage, xOff, yOff });
};

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', spatialFilter);

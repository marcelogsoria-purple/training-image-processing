export const templates = {
  // Source: https://en.wikipedia.org/wiki/Kernel_(image_processing)
  Sharpen: {
    squareMatrix: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
    scale: 1,
  },
  'Box Blur': {
    squareMatrix: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    scale: 9,
  },
  'Edge Detection': {
    squareMatrix: [
      [-1, -1, -1],
      [-1, 8, -1],
      [-1, -1, -1],
    ],
    scale: 1,
  },
  'Gaussian Blur': {
    squareMatrix: [
      [1, 2, 1],
      [2, 4, 2],
      [1, 2, 1],
    ],
    scale: 16,
  },
  // Source: http://setosa.io/ev/image-kernels/
  Emboss: {
    squareMatrix: [
      [-2, -1, 0],
      [-1, 1, 1],
      [0, 1, 2],
    ],
    scale: 1,
  },
};

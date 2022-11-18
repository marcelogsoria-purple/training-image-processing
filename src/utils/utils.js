import _ from 'lodash';
export const posToIndex = (imgWidth) => (x, y) => {
  /**
   * maps from a pixel channel's location (x, y) to its index in the array of an image
   */
  const i = 4 * x + 4 * y * imgWidth;
  return i;
};

// TODO7: Complete the higher order function pixelsAround to get the value of the
// pixels around a specific coordinate (x,y)
// i is the channel
const pixelsAround = (img, x, y, i) => {
  // Pn are pixel around the point
  //
  //   P1     P2     P3
  //   P4   (x,y)    P5
  //   P6     P7     P8
  // Use the posToIndex function to generate another function to convert coordinates
  // to index for the array of values on img.pixels
  //return 0 for the position outside the image, otherwise return the value for the pixel
  //from img.pixels, you could use _.map
};

// TODO8: Complete the higher order function to generate the generateKernelFunction
const generateKernelFunction = ({ kernelArray, scale }, image) => {
  // i is the channel
  return (x, y, i) => {
    const pixels = pixelsAround(image, x, y, i);
    //... apply the kernel array to the pixels, see _.zipWith
    //... after that sum all the indexes of the zip, use .reduce or _.sum
    // if scale is 0 just return the sum, otherwise sum / scale
  };
};

export const filterImage = (kernel, image) => {
  const applyKernel = generateKernelFunction(
    {
      kernelArray: _.flatten(kernel.squareMatrix),
      scale: kernel.scale,
    },
    image,
  );

  const resImage = [];
  // don't process pixels on the image's edge. These edge pixels also won't be returned to the main thread
  for (let y = 1; y < image.height - 1; y++) {
    for (let x = 1; x < image.width - 1; x++) {
      // TODO9: use the applyKernel generated function to generate the values for all the channels [r,g,b,alpha]
      // alpha has to be 255, we don't apply the kernel to the alpha channel otherwise we could have a transparent image
      // as result
    }
  }

  return resImage;
};

export const getPartitions = (image) => {
  /**
   * Return 4 partitions of an image,
   * each partition being a tuple (xOff, yOff, partWidth, partHeight)
   */

  // TODO4: It divides the image into 4 partitions, use image.width and image.height
  /* it returns an array like this one:
     [
      [
        xOffset, yOffset, partWidth, partHeight
      ],
      [
        xOffset, yOffset, partWidth, partHeight
      ],
      [
        xOffset, yOffset, partWidth, partHeight
      ],
      [
        xOffset, yOffset, partWidth, partHeight
      ],
     ]
  */

  return [];
};

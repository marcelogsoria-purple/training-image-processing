import React, { useCallback, useEffect, useRef, useState } from 'react';

import { getPartitions, posToIndex } from '../../utils';
import styles from './Exercise1.module.scss';
import { templates } from './contants';

// TODO1: Replace the mock by importing the worker source code using worker-loader
// See https://v4.webpack.js.org/loaders/worker-loader/
const spatialFilterWorker = 'replaceThisMock()';

const Exercise1 = () => {
  const canvasInRef = useRef(null);
  const canvasOutRef = useRef(null);
  const imgOutDataRef = useRef(null);
  const imgInRef = useRef(null);

  const ctxOut = useRef(null);
  const ctxIn = useRef(null);

  const workerCount = 4;
  // TODO2: Initialize useState creating workers using workerCount as quantity instead of []
  const [workers] = useState([]);

  const [numRunning, setNumRunning] = useState(0);

  const [workerEventHandlersAssigned, setWorkerEventHandlersAssigned] =
    useState(false);

  const [kernelMatrix, setKernelMatrix] = useState([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ]);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    ctxIn.current = canvasInRef.current.getContext('2d');
    ctxOut.current = canvasOutRef.current.getContext('2d');
  }, []);

  const changeKernelMatrixCell = ({ rowNum, colNum, value }) => {
    // TODO3: Here we need to rebuild the kernel Matrix based on the values from the
    //inputs and setKernelMatrix with the new matrix:
  };

  const handleResponse = useCallback(
    (event) => {
      const toIndex = posToIndex(imgInRef.current.width);
      const { newImage, xOff, yOff } = event.data;

      for (const [x, y, channels] of newImage) {
        const i = toIndex(xOff + x, yOff + y);
        imgOutDataRef.current.data[i + 0] = channels[0];
        imgOutDataRef.current.data[i + 1] = channels[1];
        imgOutDataRef.current.data[i + 2] = channels[2];
        imgOutDataRef.current.data[i + 3] = channels[3];
      }

      ctxOut.current.putImageData(imgOutDataRef.current, 0, 0);
      setNumRunning((previousValue) => previousValue - 1);
      if (numRunning === 0) {
        console.timeEnd('Filter time');
      }
    },
    [numRunning],
  );

  useEffect(() => {
    if (!workerEventHandlersAssigned) {
      for (const worker of workers) {
        worker.onmessage = (event) => {
          handleResponse(event);
        };
      }
      setWorkerEventHandlersAssigned(true);
    }
  }, [handleResponse, workerEventHandlersAssigned, workers]);

  const sendRequest = useCallback(() => {
    const partitions = getPartitions(imgInRef.current);

    const kernel = {
      squareMatrix: kernelMatrix,
      scale,
    };

    for (let i = 0; i < workers.length; i++) {
      // TODO5: We need to send a message for every partition,
      // ex: Message for partition 0 to worker 0
      //     Message for partition 1 to worker 1 and so on...
      //
      // Hint: you can get the image data corresponding to a partition like this
      // const subImgData = ctxIn.current.getImageData(xOff, yOff, w, h);
      // Takes the image data corresponding to the current partition
      // Post a message to the corresponding worker
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
      // TODO6: Increase the number of running workers
    }
    console.time('Filter time');
  }, [kernelMatrix, scale, workers]);

  useEffect(() => {
    imgInRef.current = new Image();
    imgInRef.current.src = `images/cat-hat.jpeg`;
    imgInRef.current.addEventListener('load', function () {
      ctxOut.current.clearRect(
        0,
        0,
        canvasOutRef.current.width,
        canvasOutRef.current.height,
      );
      canvasInRef.current.width = imgInRef.current.width;
      canvasInRef.current.height = imgInRef.current.height;
      ctxIn.current.drawImage(imgInRef.current, 0, 0);
      canvasOutRef.current.width = imgInRef.current.width;
      canvasOutRef.current.height = imgInRef.current.height;
      imgOutDataRef.current = ctxOut.current.createImageData(
        imgInRef.current.width,
        imgInRef.current.height,
      );
    });
  }, []);

  return (
    <div id="content">
      <div className="row">
        <h1 id="title">Spatial-domain Image Filtering</h1>
      </div>
      <div className="row">
        <p>
          This demonstrates spatial-domain image filtering on an input image
          using a kernel (
          <a href="https://en.wikipedia.org/wiki/Kernel_(image_processing)">
            wikipedia
          </a>
          ). The first canvas holds the input image. The kernel shown below will
          be used for the filtering. The output image will appear on the second
          canvas. You can edit the kernel all you want, or select one of the
          given kernels. You can also select from a list of sample input images.
          The "apply" button will be disabled while the image is being processed
          and will be re-enabled when it's done. You'll need to be patient if
          your device is slow, because it'll take a few seconds. That's why I
          recommend you use a desktop/laptop, but most phones would still be
          capable of handling the load. Choose an image you like, a kernel you
          think sounds cool, and go to town (you must at least try edge
          detection on the skeletons and sharpening the renaissance painting).
          Inspired by{' '}
          <a href="http://setosa.io/ev/image-kernels/">this blog post</a>.
        </p>
      </div>
      <div className={styles['image-canvas']}>
        <div id="sketch-in" className={styles['canvas-container']}>
          <canvas id="img-in" ref={canvasInRef}></canvas>
        </div>
        <div id="sketch-out" className={styles['canvas-container']}>
          <canvas id="img-out" ref={canvasOutRef}></canvas>
        </div>
      </div>

      <div className={styles['kernel-table']}>
        <table>
          <caption>Kernel</caption>
          {kernelMatrix?.map((row, rowIndex) => (
            <tr>
              {row?.map((cell, colIndex) => (
                <td>
                  <input
                    type="number"
                    value={cell}
                    onChange={(event) => {
                      console.log(
                        'updating row, col, newValue',
                        rowIndex,
                        colIndex,
                        event.target.value,
                      );
                      changeKernelMatrixCell({
                        rowNum: rowIndex,
                        colNum: colIndex,
                        value: event.target.value,
                      });
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>

      <div className={styles['row']}>
        <label for="scale-textbox">Scale</label>
        <input
          id="scale-textbox"
          type="number"
          value={scale}
          onChange={(event) => {
            setScale(event.target.value);
          }}
        />
      </div>
      <div className={styles['row']}>
        <select
          id="kernel-select"
          onChange={(event) => {
            console.log(event.target.value);
            const selectedOption = event.target.value;
            const selectedTemplate = templates[selectedOption];
            setKernelMatrix(selectedTemplate.squareMatrix);
            setScale(selectedTemplate.scale);
          }}
        >
          <option value="Sharpen">Sharpen</option>
          <option value="Box Blur">Box Blur</option>
          <option value="Edge Detection">Edge Detection</option>
          <option value="Gaussian Blur">Gaussian Blur</option>
          <option value="Emboss">Emboss</option>
        </select>
      </div>
      <div className={styles['row']}>
        <div>Number of running workers: {numRunning}</div>
      </div>

      <div className={styles['apply-button']}>
        <button
          id="apply-kernel-btn"
          type="button"
          onClick={() => {
            sendRequest();
          }}
        >
          Apply filter
        </button>
      </div>
    </div>
  );
};

export default Exercise1;

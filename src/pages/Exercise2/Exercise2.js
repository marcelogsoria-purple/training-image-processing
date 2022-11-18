const Exercise2 = () => (
  <div id="content">
    <div className="row">
      <h1 id="title">Bit-plane Slicing</h1>
    </div>
    <div className="row">
      <p>
        This demonstrates bit-plane slicing on a given input image. The slider's
        value indicates the bit-plane of the image we want to retrieve. The
        value 0 stands for the most significant bit-plane and 7 stands for the
        least significant. The images are rendered using the RGB 0-255 range,
        but since bit-plane slicing is supposed to return a binary image, the
        output bit value of 1 is mapped to the RGB value of 255 before rendering
        it. The bit-plane slicing process is performed separately for each of
        the RGB channels and the bit-plane images are combined. Notice how the
        0-plane is mostly white, since most images easily have a lot of pixels
        of values greater than 128 (equal to 10000000 in binary).
      </p>
    </div>
    <div id="sketch-in" className="canvas-container">
      <canvas id="img-in"></canvas>
    </div>
    <div id="sketch-out" className="canvas-container">
      <canvas id="img-out"></canvas>
    </div>
    <div className="row">
      <select id="image-select">
        <option value="street-skeletons">Street Skeletons</option>
        <option value="cat-hat">Cat In A Hat</option>
        <option value="lenna">Lenna</option>
        <option value="painting">Renaissance Painting</option>
        <option value="tower">Concrete Tower</option>
        <option value="zebra">Zebra</option>
      </select>
    </div>
    <div className="row" style={{ flexDirection: 'column' }}>
      <input id="bit-input" type="range" min="0" max="7" />
      <span id="bit-input-disp"></span>
    </div>
    <div className="row">
      <button id="apply-slicing-btn" type="button">
        Apply slicing
      </button>
    </div>
  </div>
);

export default Exercise2;

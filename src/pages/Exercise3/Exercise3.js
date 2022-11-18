const Exercise3 = () => (
  <div id="content">
    <div className="row">
      <h1 id="title">Histogram Equalisation</h1>
    </div>
    <div className="row">
      <p>
        This demonstrates histogram equalisation. The algorithm used here is the
        one given in the{' '}
        <a href="https://en.wikipedia.org/wiki/Histogram_equalization">
          Wikipedia definition
        </a>
        . The equalisation is performed separately for the RGB channels. The
        alpha channel is left as it is, or the output might be transparent. Try
        it out on the colour images to see how it changes their colour balance.
        This change in colour balance can be avoided by first transforming the
        image to a more appropriate colour space and equalising that instead.
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
    <div className="row"></div>{' '}
    {/* <!-- HACK - must exist to follow layout.css grid rules--> */}
    <div className="row">
      <button id="apply-equal-btn" type="button">
        Equalise
      </button>
    </div>
  </div>
);

export default Exercise3;

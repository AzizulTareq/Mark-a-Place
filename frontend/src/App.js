import React, { useState } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';
import { ImLocation2 } from 'react-icons/im'

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 23.7612,
    longitude: 90.4208,
    zoom: 4
  });
  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
>
      <Marker latitude={23.8070} longitude={90.3636} offsetLeft={-20} offsetTop={-10}>
        <ImLocation2 style={{ fontSize: viewport.zoom * 7, color: '#26AFBF'}} />
      </Marker>
    </ReactMapGL>
    </div>
  );
}

export default App;

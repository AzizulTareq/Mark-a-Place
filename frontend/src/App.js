import React, { useState, useEffect } from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { ImLocation2 } from 'react-icons/im'
import { AiFillStar } from 'react-icons/ai'
import axios from 'axios'
import { format } from 'timeago.js'
import './App.css'

function App() {
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 23.7612,
    longitude: 90.4208,
    zoom: 4
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const onMarkerClick = (id) => {
      setCurrentPlaceId(id)
  }
  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/azizultareq/ckr8uqwzr1prq18p0wrxzpndw"
>
      
      {pins.map((p) => (
        <>
        <Marker latitude={p.lat} longitude={p.long} offsetLeft={-20} offsetTop={-10}>
        <ImLocation2 style={{ fontSize: viewport.zoom * 7, color: '#FFAA00'}}
        onClick={() => onMarkerClick(p._id)}
        />
      </Marker>

        {p._id === currentPlaceId && (
          <Popup
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left" >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
            <label>Rating</label>
            <div className="stars">
              <AiFillStar className="star" />
              <AiFillStar className="star" />
              <AiFillStar className="star" />
              <AiFillStar className="star" />
              <AiFillStar className="star" />
            </div>
            <label>Information</label>
            <span className="user">Created by <b>{p.username}</b></span>
            <span className="date">{format(p.createdAt)}</span>
          </div>
      </Popup>

        )}
       
      </>

      ))}
     
    </ReactMapGL>
    </div>
  );
}

export default App;

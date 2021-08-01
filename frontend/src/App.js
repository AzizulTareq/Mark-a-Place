import React, { useState, useEffect } from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { ImLocation2 } from 'react-icons/im'
import { AiFillStar } from 'react-icons/ai'
import axios from 'axios'
import { format } from 'timeago.js'
import Register from './components/Register'
import './App.css'

function App() {
  const [currentuser, setCurrentuser] = useState(null)
  const [pins, setPins] = useState([])
  const [newPlace, setNewPlace] = useState(null)
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [rating, setRating] = useState(0)
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

  const onMarkerClick = (id, lat, long) => {
      setCurrentPlaceId(id)
      setViewport({
        ...viewport,
        latitude: lat,
        longitude: long 
      })

  }

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat

    setNewPlace({
      long,
      lat
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentuser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long
    }

    try {
      const res = await axios.post('/pins', newPin);
      setPins([...pins, res.data]);
      setNewPlace(null)
    } catch(err) {
      console.log(err)
    }
  }


  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/azizultareq/ckr8uqwzr1prq18p0wrxzpndw"
      onDblClick = {handleAddClick}
>
      
      {pins.map((p) => (
        <>
        <Marker latitude={p.lat} longitude={p.long} offsetLeft={-viewport.zoom * 3.5} offsetTop={-viewport.zoom * 7}>
        <ImLocation2 style={{ fontSize: viewport.zoom * 7, color: p.username === currentuser? 'red' : '#FFAA00', cursor: 'pointer'}}
        onClick={() => onMarkerClick(p._id, p.lat, p.long)}
        />
      </Marker>

        {p._id === currentPlaceId && (
          <Popup
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setCurrentPlaceId(null)}
          anchor="left" >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
            <label>Rating</label>
            <div className="stars">
              {Array(p.rating).fill(<AiFillStar style={{color: 'gold'}} />)}
            </div>
            <label>Information</label>
            <span className="user">Created by <b>{p.username}</b></span>
            <span className="date">{format(p.createdAt)}</span>
          </div>
      </Popup>
        )}  
      </>
      ))}
        {newPlace && (
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
          anchor="left" >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                  placeholder='Enter a title'
                  onChange={(e)=>setTitle(e.target.value)}
                />
              
                <label>Review</label>
                <textarea 
                  placeholder='Write about this place'
                  onChange={(e)=>setDesc(e.target.value)}
                />

             
                <label>Rating</label>
                <select onChange={(e)=>setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">Add Review</button>
              </form>
            </div>
          </Popup>

      )}
      {currentuser ? (<button className="button logout" >Log out</button>) : (
          <div className="buttons">
          <button className="button login">Login</button>
          <button className="button register">Register</button>
          </div>
      )}
     <Register />
    </ReactMapGL>
    </div>
  );
}

export default App;

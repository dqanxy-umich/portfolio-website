import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StarmapComponent from "./Starmap/StarmapComponent";
import Body, { BodyModel } from "./Body";
import EventBus from './EventBus';
import StarModel from './Star/StarModel';
import StarBodies from './smstates/starBodies.json'

function App() {
  const [bodyModel, setModel] = useState(new BodyModel())
  EventBus.getInstance().subscribe("starClicked", (starModel:StarModel)=>{
    setModel(StarBodies["bodies"][starModel.id])
  })

  return (
          <div className="App">
              <StarmapComponent></StarmapComponent>

              <Body model={bodyModel}></Body>

          </div>
  );
}

export default App;

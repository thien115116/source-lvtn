import * as React from "react";
import { useState } from "react";
import ReactMapGL, {
  MapContext,
  _useMapControl as useMapControl,
  Popup,
  LinearInterpolator,
} from "@goongmaps/goong-map-react";
import "./MainPage.css";
import { useSelector } from "react-redux";
import MerchantPopup from "features/Location/components/MerchantPopup";
const GOONG_MAPTILES_KEY = "IJPBTWqprny9PaoVgu8K0kT8oABYCCKi7KcjBVFm";
function CustomMarker(props) {
  const context = React.useContext(MapContext);
  const [showPopup, setShowPopup] = useState(false);
  const [x, y] = context.viewport.project([props.long, props.lat]);

  const { containerRef } = useMapControl({
    onDragStart: (evt) => {
      // prevent the base map from panning
      evt.stopPropagation();
    },
    onClick: (evt) => {
      if (evt.type === "click") {
        setShowPopup(!showPopup);
      }
    },
    onPointerMove: (evt) => {},
  });
  const markerStyle = {
    position: "absolute",
    width: 50,
    height: 50,
    left: x,
    top: y,
  };

  return (
    <>
      {showPopup && (
        <Popup
          latitude={props.lat}
          longitude={props.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
          anchor="right"
        >
          <div style={{ padding: "10px 15px" }}>
            <MerchantPopup data={props.data} />
          </div>
        </Popup>
      )}
      <div ref={containerRef} className="marker" style={markerStyle}></div>
    </>
  );
}
function GoongMap() {
  const list = useSelector((state) => state.location.list);
  console.log(list);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: `${window.innerHeight - 30}px`,
    latitude: 10.737852,
    longitude: 106.677929,
    zoom: 11,
  });

  return (
    <ReactMapGL
      {...viewport}
      onClick={(evt) => {
        console.log(evt);
      }}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
      mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
      transitionInterpolator={new LinearInterpolator()}
    >
      {list !== null
        ? list.map((item, index) => {
            console.log(item.latitude);
            return (
              <CustomMarker
                key={index}
                long={item.longtitude}
                lat={item.latitude}
                data={item}
              />
            );
          })
        : ""}
    </ReactMapGL>
  );
}
export default GoongMap;

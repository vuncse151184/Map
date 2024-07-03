import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet'

const icon = L.icon({
    iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize: [38, 38],
})

const position = [51.505, -0.09]

function ResetCenterView(props) {
    const { selectPosition } = props
    console.log("ĐANG Ở ĐÂY")
    const map = useMap()
    useEffect(() => {
        if (selectPosition) {
            map.setView(
                L.latLng(selectPosition.lat, selectPosition.lon),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }

    }, [selectPosition])
    return null
}
function Maps(props) {
    const { selectPosition } = props
    const locationSelection = [selectPosition?.lat, selectPosition?.lon]

    console.log("locationSelection", locationSelection)
    return (
        <MapContainer center={position} zoom={6} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                selectPosition && (
                    <Marker position={locationSelection} icon={icon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                )

            }
            <ResetCenterView selectPosition={selectPosition} />
        </MapContainer>
    )
}

export default Maps

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AsyncSelect from 'react-select/async';
import { fetchLocalMapBox } from '../api';
import { OrderLocationData } from './types';

const initialPosition = {
    lat: -7.2428323,
    lng: -35.9716049
}

type Place = {
    label?: string;
    value?: string;
    position: {
        lat: number;
        lng: number
    };
}

type Props = {
    onChangeLocation: (location: OrderLocationData) => void;
}

function OrderLocation({ onChangeLocation }: Props) {
    const [addresss, setAddress] = useState<Place>({
        position: initialPosition
    });

    const loadOptions = (inputValue: string, callback: (places: Place[]) => void) => {
        fetchLocalMapBox(inputValue).then(response => {
            const places = response.data.features.map((item: any) => {
                return ({
                  label: item.place_name,
                  value: item.place_name,
                  position: {
                    lat: item.center[1],
                    lng: item.center[0]
                  }
                });
              });
              callback(places);
        });
      
      };
      
      const handleChangeSelect = (place: Place) => {
        setAddress(place);
        onChangeLocation({
          latitude: place.position.lat,
          longitude: place.position.lng,
          address: place.label!
        });
      };

    return (
        <div className="order-location-container">
            <div className="order-location-content">
                <h3 className="order-location-title">
                    Selecione onde o pedido deve ser entregue:
                </h3>
                <div className="filter-container">
                    <AsyncSelect
                        placeholder="Digite um endereço para a entrega do pedido."
                        className="filter"
                        loadOptions={loadOptions}
                        onChange={value => handleChangeSelect(value as Place)}
                    />
                </div>
                <MapContainer 
                    center={addresss.position} 
                    zoom={13} 
                    key={addresss.position.lat}
                    scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={addresss.position}>
                        <Popup>
                            {addresss.label}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default OrderLocation;
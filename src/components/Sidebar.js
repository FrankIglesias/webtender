import React, { useEffect, useMemo, useState } from 'react';
import { getPhoto } from '../services/photos';
import { Watch, MapPin, Phone, X, ExternalLink } from 'react-feather';
import styles from './Sidebar.module.scss';

export default function Sidebar({ place, close }) {
  const [hero, setHero] = useState(null);
  useEffect(() => {
    const photoReference = place.photos?.[0].photo_reference;
    if (photoReference) {
      setHero(getPhoto(photoReference).data);
    }
    return () => {
      setHero(null);
    };
  }, [place.photos?.[0].photo_reference]);

  return (
    !!Object.keys(place).length && (
      <div className={styles.sidebar}>
        <img src={hero} className={styles.placePhoto} alt={place.name} />
        <div>
          <h1 className='title'>{place.name}</h1>
          <button className={styles.close} onClick={close}>
            <X color='#333332' />
          </button>
        </div>
        <a className='link m-bottom-1' href={place.url} target='_blank'>
          <MapPin size={20} /> {place.formatted_address}
        </a>
        {!!place.opening_hours?.weekday_text?.length && (
          <span className='subtitle'>
            <Watch />
            Horarios
          </span>
        )}
        <ul className="m-bottom-1">
          {place.opening_hours?.weekday_text.map((day) => (
            <li key={day}>· {day}</li>
          ))}
        </ul>
        {place.formatted_phone_number && (
          <a className='link m-bottom-1' href={`tel:${place.formatted_phone_number}`}>
            <Phone size={18} /> {place.formatted_phone_number}
          </a>
        )}
        <a className='link' href={place.website} target='_blank'>
          <ExternalLink size={18} /> Sitio web
        </a>
      </div>
    )
  );
}

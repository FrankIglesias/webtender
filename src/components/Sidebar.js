import React from 'react';

import styles from './Sidebar.module.scss';

export default function Sidebar({ place, close }) {
  return (
    !!Object.keys(place).length && (
      <div className={styles.sidebar}>
        <div>
          <span className={styles.placeName}>{place.name}</span>
          <button className={styles.close} onClick={close}>X</button>
        </div>
        <span className={styles.address}>{place.formatted_address}</span>
        <div>{place.opening_hours?.weekday_text.map((day) => <p>{day}</p>)}</div>
        <a className={styles.link} href={`tel:${place.formatted_phone_number}`}>{place.formatted_phone_number}</a>
        <a className={styles.link} href={place.website} target="_blank">Sitio web</a>
        <a className={styles.link} href={place.url} target="_blank">Ir a Google Maps</a>
      </div>
    )
  );
}

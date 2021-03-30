import React from 'react';

import styles from './Sidebar.module.scss';

export default function Sidebar({ place }) {
  return (
    !!Object.keys(place).length && (
      <div className={styles.sidebar}>
        <span className={styles.placeName}>{place.name}</span>
        <div>{place.formatted_address}</div>
        <div>{place.formatted_phone_number}</div>
        <div>
          {place.opening_hours.weekday_text.map((day) => (
            <p>{day}</p>
          ))}
        </div>
      </div>
    )
  );
}

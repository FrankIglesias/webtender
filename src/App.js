import { useEffect, useState } from 'react';
import  styles from './App.module.scss';
import places from './constants';
import { findPlace } from './services/places';
import cocktailIcon from './cocktail.svg'
import ReactMapGL, { Marker } from 'react-map-gl';
import Sidebar from './components/Sidebar'
const mockPlace = {
  html_attributions: [],
  result: {
    address_components: [
      {
        long_name: '5207',
        short_name: '5207',
        types: ['street_number'],
      },
      {
        long_name: 'Honduras',
        short_name: 'Honduras',
        types: ['route'],
      },
      {
        long_name: 'Palermo',
        short_name: 'Palermo',
        types: ['sublocality_level_1', 'sublocality', 'political'],
      },
      {
        long_name: 'Comuna 14',
        short_name: 'Comuna 14',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'Buenos Aires',
        short_name: 'CABA',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'Argentina',
        short_name: 'AR',
        types: ['country', 'political'],
      },
      {
        long_name: 'C1414',
        short_name: 'C1414',
        types: ['postal_code'],
      },
    ],
    adr_address:
      '<span class="street-address">Honduras 5207</span>, <span class="postal-code">C1414</span> <span class="locality">CABA</span>, <span class="country-name">Argentina</span>',
    business_status: 'OPERATIONAL',
    formatted_address: 'Honduras 5207, C1414 CABA, Argentina',
    formatted_phone_number: '011 6227-9609',
    geometry: {
      location: {
        lat: -34.5872654,
        lng: -58.4322098,
      },
      viewport: {
        northeast: {
          lat: -34.5859537197085,
          lng: -58.43089971970849,
        },
        southwest: {
          lat: -34.5886516802915,
          lng: -58.43359768029151,
        },
      },
    },
    icon:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png',
    international_phone_number: '+54 11 6227-9609',
    name: 'Boticario',
    opening_hours: {
      open_now: false,
      periods: [
        {
          close: {
            day: 1,
            time: '0200',
          },
          open: {
            day: 0,
            time: '2000',
          },
        },
        {
          close: {
            day: 3,
            time: '0200',
          },
          open: {
            day: 2,
            time: '2000',
          },
        },
        {
          close: {
            day: 4,
            time: '0200',
          },
          open: {
            day: 3,
            time: '2000',
          },
        },
        {
          close: {
            day: 5,
            time: '0200',
          },
          open: {
            day: 4,
            time: '2000',
          },
        },
        {
          close: {
            day: 6,
            time: '0200',
          },
          open: {
            day: 5,
            time: '2000',
          },
        },
        {
          close: {
            day: 0,
            time: '0200',
          },
          open: {
            day: 6,
            time: '2000',
          },
        },
      ],
      weekday_text: [
        'Monday: Closed',
        'Tuesday: 8:00 PM – 2:00 AM',
        'Wednesday: 8:00 PM – 2:00 AM',
        'Thursday: 8:00 PM – 2:00 AM',
        'Friday: 8:00 PM – 2:00 AM',
        'Saturday: 8:00 PM – 2:00 AM',
        'Sunday: 8:00 PM – 2:00 AM',
      ],
    },
    photos: [
      {
        height: 1960,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107720754736188434406">Damian Chiappela</a>',
        ],
        photo_reference:
          'ATtYBwKRJMDJTqYvsEPfJhJIwmDTNidqCVms_D-wawWlVKJcABQJ6-xIGrFH_yHmSCS2-sqMGBV_T2SB3nl3HA-HMvUgIlJ9cfcti_3TIhgmn33EySDpXzM7UQ8Eusl_BHiMwY0gTrxyODkLzO7u2ydEDAJCIzAFBZp0sCX1qB5xJPb4eQl9',
        width: 4032,
      },
      {
        height: 718,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/116444732065360153391">Flora Pintó</a>',
        ],
        photo_reference:
          'ATtYBwKrxoS7asLAs9Q5-XVKPa80ssJ3_E_dPMyNvvadNPXj01rM9QOe1p8QIuvPpMAlJDIL52yaMhA2mahIclArrVJkOj-RLmdMgHoTR-xryTXDKxShTVB0GGAkGE-LIUKAx2O9yCexghLG2mJ3RWxBqG-PN44Epm6lpwZX6sI5WVouAKua',
        width: 1280,
      },
      {
        height: 718,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/116444732065360153391">Flora Pintó</a>',
        ],
        photo_reference:
          'ATtYBwK0nZrH7NIdZ2zBfH2hda3WNZcE2YPhrbDWnmmVxmNBjUi4SlHQhnYOZFtIaDRD5Ute_5HNLzkwImWfEuuY0V5o-qONFHNbIJuq0Ihva5ilBVpdPq1Wl48iSv8lvqiUXCbhrBja36vvp5cjpqT7l3k6CLVr6Kvb__aXA6mgSkmiBvNm',
        width: 1280,
      },
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/106744698854047042210">Valeria Linares</a>',
        ],
        photo_reference:
          'ATtYBwImd7C0LWBEEaYWqspWSDU5koki-aqpt_qbiU_COjhb_TN3BjsZC3d7BVK_PGZGLcE1iqneCK3fDk2hvJGDN_-TCxoM3G58cTnNMphHsZmCN6JP6qg2PaL-Tdns5psooXVw2FVQTVafW6tv8DYy6rQ6u46hyZ-21wWUNjseUiPwrd6v',
        width: 4032,
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104189350105999919760">Lucas Ceballos</a>',
        ],
        photo_reference:
          'ATtYBwIZp-mZWWjiAzwfiNRvwS1h_CPKuPK3zdGBMbDkBxfTeJsiWasJUUlfWBzYhgelrlRcc3qz6XFFZcdQwjyvntCeItvmEoQFppTg995xlLFLkTc9-3CHx9iLLN1mzQtpTcNGFDrmzB-6f76SWOgEH6uS0jyyzlD81gGRIhZNf2ByEGN3',
        width: 3024,
      },
      {
        height: 2048,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/108158104422458309794">FBI - Food &amp; Beverage Inspector</a>',
        ],
        photo_reference:
          'ATtYBwLvs_1KWP9y_ZMzHLDvgOV_kJb0N9tsjdsiEHkQ40EFIM2SQ4WBRniQvqKuk-nKeW1d2Y8Xz5T_hI6c3W5P6NjZoRhwTVgC_pgZrNF7t2T7prrnajU6GfypC4T-AZ45FhmXKhVFoJH3wd7Aa2RSkvfYNl_WKqT7q5aI9qrYiG1FmaXz',
        width: 1536,
      },
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/106912326848112192038">Andrés Ramallo</a>',
        ],
        photo_reference:
          'ATtYBwJHb6nflMifBNXafWgL3V0mN4RXptp-cqHAS3Nc-r-zP-X1pO3eIkYqlJnjX_O0qrlzPecENVjGKXkaOIiPKLJeMJRpJj7Bedh0bxgG1vIplyuv32mPp9NmHl8VoQ2R4oUkQn1IPvlEtSUQPQyudRzqjKlb-5QIqtKRtMppRoD03Cn-',
        width: 4032,
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/103595076871741676049">Julian Stocco</a>',
        ],
        photo_reference:
          'ATtYBwL09qvcyYTpInK267C9IOHlmQQlfCY3WP-TrGVNLAdsayPpC5zH-0mtb1xvbk57Ul7vL6XFN_UXK7MHfWkXwL_WRFcjfQ9jLZowRfbN132gx9ZwxfBwijac-GoLzk3-7G9-9dW1BBZc6iYt3fBwetyOfRHSgiVdMB235QtAISEs9QZx',
        width: 3024,
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/118176024954568179149">Laura Lamas</a>',
        ],
        photo_reference:
          'ATtYBwI21vabb-saRU8sj8IPmiXVihH2DQIOgBazyuo0FRE2fQB0IMZG_Nb2ezvElDU1RehAsGbPardDuLEyzUY-4-jNUqRv189kbfuobo2eJmKfZiUBKC6VR4hVw_cluGeAx00akc4BJyjPWZucYqgw8TAVnWe_Ee1UEOCsXiVCKubQtvdh',
        width: 3024,
      },
      {
        height: 3264,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/118411203734595378507">Roxana Avila</a>',
        ],
        photo_reference:
          'ATtYBwLNXVOQj7i68lSXn63wduFyCQxO2WzP7RspBue2Uk_a6Sp3a-kTm53r3WEuht8pqG4CsoRKUWCN2Q7cdLgvT4DjcZJS_Ul7PBgBm6-QEiNjEadO9yPrb8imd-nOmtZEH6HAJDA2f7y60pllqDeZMQTPX2V7zYNlPtAZyIzQnUfW7L4W',
        width: 2448,
      },
    ],
    place_id: 'ChIJrSShLYm1vJURKULu534clEw',
    plus_code: {
      compound_code: 'CH79+34 Buenos Aires, Argentina',
      global_code: '48Q3CH79+34',
    },
    price_level: 3,
    rating: 4.5,
    reference: 'ChIJrSShLYm1vJURKULu534clEw',
    reviews: [
      {
        author_name: 'The Korean',
        author_url:
          'https://www.google.com/maps/contrib/114031549453142514336/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh4.googleusercontent.com/-RlYS4c04ii0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclihRCAWVToUn8amT2zzTW9lMQyDg/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg',
        rating: 4,
        relative_time_description: 'a month ago',
        text:
          'Very good ambience, very creative drinks. The food was also tasty. But the drinks need a little refinement, wouldnt call them smooth and awesome',
        time: 1613878413,
      },
      {
        author_name: 'Karla Anaís Infante',
        author_url:
          'https://www.google.com/maps/contrib/106512288380491349773/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AOh14Gjuv5B9N-Z49m2L2M1K1ruAUo5fF42tSrXHQ5ltkw=s128-c0x00000000-cc-rp-mo-ba3',
        rating: 5,
        relative_time_description: '4 months ago',
        text:
          'Another great fusion! Amazing bar and amazing cocktails and presentations are quite an experience.',
        time: 1606240568,
      },
      {
        author_name: 'Christopher Suttenfield',
        author_url:
          'https://www.google.com/maps/contrib/118239335236317087314/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AOh14GgLnAXvnUGK3Bhpcp_inKAwAScDMODckFK2mBuvczM=s128-c0x00000000-cc-rp-mo-ba6',
        rating: 5,
        relative_time_description: 'a year ago',
        text:
          "Definitely worth checking out this upscale cocktail bar.\n\nThe service was a little chaotic, that they made for up for it by being very friendly.\n\nIt's a good place for a first date, or to share a few drinks with friends. Their cocktail menu is comprehensive, and delicious.\n\nBook a table in advance for busy nights, or be prepared to wait.",
        time: 1581906541,
      },
      {
        author_name: 'Christian Gastrell',
        author_url:
          'https://www.google.com/maps/contrib/105928708259969065156/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AOh14GhZl75Jo7xiTdFadG0mYxDJcDXlyiQ2dVmwvwiARg=s128-c0x00000000-cc-rp-mo-ba4',
        rating: 5,
        relative_time_description: 'a year ago',
        text:
          'Great place! I thought I’d go just for drinks, but the whole experience was excellent: the food was really good, service in timely manner and friendly, decoration and atmosphere are perfect. Plus you can actually buy some cutely bottled cocktails/beverages (nice gift or just to take one home if you ask me)',
        time: 1581133757,
      },
      {
        author_name: 'Santiago Elizalde',
        author_url:
          'https://www.google.com/maps/contrib/112996343288214761976/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh3.googleusercontent.com/a-/AOh14GgcrQV4kKTkiSgSxKYwjjpIziqDg6AyiWJmY_ok=s128-c0x00000000-cc-rp-mo-ba5',
        rating: 5,
        relative_time_description: 'a year ago',
        text:
          'Boticario has a great bar, with some special and very unique drinks such as a ten-hour pressure cooked old fashioned. Prices are surprisingly fair for such a place. Very good decorations and service as well.',
        time: 1581334253,
      },
    ],
    types: ['bar', 'point_of_interest', 'establishment'],
    url: 'https://maps.google.com/?cid=5518066774818308649',
    user_ratings_total: 2448,
    utc_offset: -180,
    vicinity: 'Honduras 5207',
    website: 'https://www.facebook.com/Boticariobar',
  },
  status: 'OK',
};

function App() {
  const [placeList, setPlaceList] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [mapViewport, setMapViewport] = useState({
    height: '100vh',
    width: '100wh',
    longitude: -58.3816,
    latitude: -34.6037,
    zoom: 11,
  });
  useEffect(() => {
    Promise.all(places.map(findPlace)).then(results => setPlaceList(results.map(place => place.data.result)))
  }, []);
  return (
    <div className='App'>
      <Sidebar place={selectedPlace} />
      <ReactMapGL
        {...mapViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPS_API_KEY}
        mapStyle='mapbox://styles/mapbox/dark-v10'
        onViewportChange={setMapViewport}
      >
        {placeList.map((place) => (
          <Marker
            offsetTop={-48}
            offsetLeft={-24}
            latitude={place.geometry.location.lat}
            longitude={place.geometry.location.lng}
          >
            <span className={styles.barName} onClick={() => setSelectedPlace(place)}>
              <img
                width='20'
                src={cocktailIcon}
              />
              {mapViewport.zoom > 15 && place.name}
            </span>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;

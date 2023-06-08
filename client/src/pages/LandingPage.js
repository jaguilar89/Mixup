import GooglePlacesAutocomplete from "../components/GooglePlacesAutocomplete"
const GOOGLE_MAPS_API_KEY = 'AIzaSyCgSQTGG7GPKoFFmZt4e2aH1TL2VoS_xb4'
export default function LandingPage() {
    return (
       <>
       {/* <GooglePlacesAutocomplete />
       <iframe
  width="600"
  height="450"
  style={{border: 0}}
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}
  &q=place_id:ChIJOxerSlJYwokRPmpdLA4CpWI`}>
</iframe> */}
       </>
        
    )
}

//  https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ05IRjKHxEQ0RJLV_5NLdK2w&fields=place_id&key=YOUR_API_KEY

//TODO: CREATE PLACE_ID ATTRIBUTE FOR EVENTS TABLE
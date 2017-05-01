const initialState = {
  distance: 0,
  speed: 0,
  heading: ''
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'INCREMENT_DISTANCE':
      return {
        ...state,
        distance: state.distance + action.distance
      };
    case 'SET_SPEED':
      return {
        ...state,
        speed: action.speed
      };
    case 'SET_DIRECTION':
      let x = action.heading;
      let direction = '';
      if ((x > 0 && x <= 23) || (x > 338 && x <= 360))
        direction = 'N';
      else if (x > 23 && x <= 65)
        direction = 'NE';
      else if (x > 65 && x <= 110)
        direction = 'E';
      else if (x > 110 && x <= 155)
        direction = 'SE';
      else if (x > 155 && x <= 203)
        direction = 'S';
      else if (x > 203 && x <= 248)
        direction = 'SW';
      else if (x > 248 && x <= 293)
        direction = 'W';
      else if (x > 293 && x <= 338)
        direction = 'NW';

      return {
        ...state,
        direction
      };

    default:
      return state;
  }
}

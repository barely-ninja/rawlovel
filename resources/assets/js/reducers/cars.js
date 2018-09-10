export function carsRequestError(state = false, action) {
  switch (action.type) {
      case 'CARS_REQUEST_ERROR':
          return action.hasError;
      default:
          return state;
  }
}

export function carsRequestPending(state = false, action) {
  switch (action.type) {
      case 'CARS_REQUEST_PENDING':
          return action.isPending;
      default:
          return state;
  }
}

export function cars(state = [], action) {
  switch (action.type) {
    case 'CARS_SHOW_REQUEST_SUCCESS':
        return action.cars;
    case 'CARS_UPDATE_REQUEST_SUCCESS':
        let updCars = [...state]
        const ind = updCars.findIndex((val)=>val.id==action.car.id)
        updCars[ind] = action.car
        return updCars;
    case 'CARS_CREATE_REQUEST_SUCCESS':
        return [action.car, ...state]
    case 'CARS_DELETE_REQUEST_SUCCESS':
        let delCars = [...state]
        delCars.splice(action.id, 1)
        return delCars;
    default:
        return state;
  }
}
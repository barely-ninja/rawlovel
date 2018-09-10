export function carsRequestError(bool) {
  return {
      type: 'CARS_REQUEST_ERROR',
      hasError: bool
  };
}

export function carsRequestPending(bool) {
  return {
      type: 'CARS_REQUEST_PENDING',
      isPending: bool
  };
}

export function carsShowRequestSuccess(cars) {
  return {
      type: 'CARS_SHOW_REQUEST_SUCCESS',
      cars
  };
}

export function carsUpdateRequestSuccess(car) {
    return {
        type: 'CARS_UPDATE_REQUEST_SUCCESS',
        car
    };
}

export function carsStoreRequestSuccess(car) {
    return {
        type: 'CARS_STORE_REQUEST_SUCCESS',
        car
    };
}

export function carsDeleteRequestSuccess(id) {
    return {
        type: 'CARS_DELETE_REQUEST_SUCCESS',
        id
    };
  }
  
export function carsShowAll(url) {
  return (dispatch) => {
      dispatch(carsRequestPending(true));
      fetch(url)
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              dispatch(carsRequestPending(false));
              return response;
          })
          .then((response) => response.json())
          .then((cars) => dispatch(carsShowRequestSuccess(cars)))
          .catch(() => dispatch(carsRequestError(true)));
  };
}

export function carsUpdate(url, car) {
    return (dispatch) => {
        dispatch(carsRequestPending(true));
        fetch(url+'/'+car.id, {
            method: 'PUT',
            body: JSON.stringify(car),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(carsRequestPending(false));
                return response;
            })
            .then((response) => response.json())
            .then((newCar) => dispatch(carsUpdateRequestSuccess(newCar)))
            .catch(() => dispatch(carsRequestError(true)));
    };
  }
import { combineReducers } from 'redux';
import { cars, carsRequestError, carsRequestPending } from './cars';

export default combineReducers({
  cars,
  carsRequestError,
  carsRequestPending
});
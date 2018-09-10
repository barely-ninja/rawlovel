import React from 'react';

const Car = (props) => {
  return (
    <li onClick={() => props.editCar(props.ind)}>{props.name}</li>
  )
}

export default Car
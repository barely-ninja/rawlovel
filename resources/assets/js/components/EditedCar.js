import React from 'react';

const EditedCar = (props) => {
  return (
    <input
    value={props.name}
    onChange={(ev) => props.onUpdate(props.key, ev.target.value)}></input>
  )
}

export default EditedCar
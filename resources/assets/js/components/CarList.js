import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { carsShowAll } from '../actions';
import Car from './Car'
import EditedCar from './EditedCar'

const carsAPI = 'http://rawlovel.test/api/cars'

class CarList extends Component {
    constructor() {
        super()
        this.state = {
            isEdited: false,
            ind: 0,
            value: ''
        }
    }

    componentDidMount() {
        this.props.showAll(carsAPI);
    }

    render() {
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isPending) {
            return <p>Loading…</p>;
        }

        return (
            <ul>
                {this.props.cars.map((car, ind) => (
                    (ind == this.isEdited) ?
                    <EditedCar key={ind} onUpdate={this.updateEditedCar}/> :
                    <Car key={ind} editCar={this.changeEditedCar} name={car.name}/>
                ))}
            </ul>
        );
    }
}

CarList.propTypes = {
    showAll: PropTypes.func.isRequired,
    cars: PropTypes.array.isRequired,
    hasError: PropTypes.bool.isRequired,
    isPending: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        cars: state.cars,
        hasError: state.carsRequestError,
        isPending: state.carsRequestPending
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showAll: (url) => dispatch(carsShowAll(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
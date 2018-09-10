import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { carsShowAll, carsUpdate } from '../actions';
import Car from './Car'
import EditedCar from './EditedCar'

const carsAPI = 'http://rawlovel.test/api/cars'

class CarList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdited: false,
            ind: 0,
            value: ''
        }
        this.switchEditedCar = this.switchEditedCar.bind(this)
    }

    componentDidMount() {
        this.props.showAll(carsAPI);
    }

    switchEditedCar(ind){
        if (this.state.isEdited && ind !== this.state.ind) {
            this.props.update(carsAPI, {id: this.props.cars[parseInt(ind)].id, name: this.state.value})
            this.setState({isEdited:false})
        }
        if (!this.state.isEdited) this.setState({isEdited:true, ind})
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
                    (ind == this.state.ind && this.state.isEdited) ?
                    <EditedCar key={ind} ind={ind} onUpdate={(ind, value)=>this.setState({ind, value})}/> :
                    <Car key={ind} ind={ind} editCar={this.switchEditedCar} name={car.name}/>
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
        showAll: (url) => dispatch(carsShowAll(url)),
        update: (url, payload) => dispatch(carsUpdate(url, payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
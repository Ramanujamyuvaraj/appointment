// Write your code here
import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: 'dd/mm/yyyy', starter: false}

  getStarsOn = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarter: !eachItem.isStarter}
        }
        return eachItem
      }),
    }))
  }

  filterStarter = () => {
    this.setState(prevState => ({
      starter: !prevState.starter,
    }))
  }

  toGetTitle = event => {
    this.setState({title: event.target.value})
  }

  getDate = event => {
    this.setState({date: event.target.value})
  }

  formContainer = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppoinment = {
      id: v4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarter: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppoinment],
      title: '',
      date: '',
    }))
  }

  getFilteredResult = () => {
    const {appointmentList, starter} = this.state

    if (starter) {
      return appointmentList.filter(eachItem => eachItem.isStarter === true)
    }
    return appointmentList
  }

  render() {
    const {title, date, starter} = this.state
    const isActive = starter ? 'starter-buttonActive' : 'starter-button'
    const filteredResult = this.getFilteredResult()

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-container">
            <form onSubmit={this.formContainer}>
              <label htmlFor="Title" className="titel-heading">
                Title
              </label>
              <input
                id="Title"
                type="text"
                className="input-text"
                onChange={this.toGetTitle}
                value={title}
                placeholder="Title"
              />
              <br />
              <label htmlFor="date" className="titel-heading">
                Date
              </label>
              <input
                className="input-text"
                id="date"
                type="date"
                onChange={this.getDate}
                placeholder="dd/mm/yyyy"
                value={date}
              />
              <br />
              <button type="submit" data-testid="star" className="button">
                Add
              </button>
            </form>
            <img
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="button-container">
            <h1 className="apointment">Appointments</h1>
            <button
              type="button"
              onClick={this.filterStarter}
              className={isActive}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredResult.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                onGetStar={this.getStarsOn}
                eachItem={eachItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

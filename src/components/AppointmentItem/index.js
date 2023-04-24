/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/alt-text */
// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachItem, onGetStar} = props

  const {title, date, isStarter, id} = eachItem

  const getButtonStars = () => {
    onGetStar(id)
  }

  const stars = isStarter
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-card">
      <div>
        <p className="headingtitle">{title}</p>
        <p className="date-timing">{date}</p>
      </div>
      <button type="button" testid="star" onClick={getButtonStars}>
        <img alt="star" src={stars} className="images" />
      </button>
    </li>
  )
}

export default AppointmentItem

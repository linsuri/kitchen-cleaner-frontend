import React from 'react'
import { connect } from 'react-redux'

class LoggedInHeader extends React.Component {
  state = {

  }
}

const mapStateToProps = ({ usersReducer: { user } }) => {
  return {
    user,
  }
}

export default connect(mapStateToProps, null)(LoggedInHeader)

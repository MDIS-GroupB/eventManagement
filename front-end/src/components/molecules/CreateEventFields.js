import React from 'react'
import TextField from '../atoms/TextField'

export default class ViewEventTabs extends React.Component {

  render() {
    return (
      <div>
        {this.props.createEventTextFields.fields.map((eventField) => {
          console.log(eventField.id)
          return (<>
            <TextField
              key={eventField.id}
              onChange={this.props.createEventTextFields.onInputChange}
              onEnterKeyDown={this.createEvent}
              value={this.props.state[eventField.id]}
              label={eventField.label}
              id={eventField.id}
              hintText={eventField.label}
              floatingLabelText={eventField.label}
            />
            <br />
          </>)
        })}
      </div>
    )
  }
}

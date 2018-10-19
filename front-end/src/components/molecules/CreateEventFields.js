import React from 'react'
import TextField from '../atoms/TextField'

export default class ViewEventTabs extends React.Component {

  render() {
    console.log(this.props.createEventTextFields)
    return (
      <div>
        {this.props.createEventTextFields.fields.map((eventField) => {
          return (<div>
            <TextField
              key={eventField.id}
              onChange={this.onInputChange}
              onEnterKeyDown={this.createEvent}
              value={this.props.state[eventField.id]}
              label={eventField.label}
              id={eventField.id}
              hintText={eventField.label}
              floatingLabelText={eventField.label}
            />
            <br />
          </div>)
        })}
      </div>
    )
  }
}

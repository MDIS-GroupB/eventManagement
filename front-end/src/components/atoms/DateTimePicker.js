import React from 'react';
import TextField from '../atoms/TextField'
import moment from 'moment'

class ScrollDialog extends React.Component {

  componentDidUpdate() {
    console.log('date change')
    console.log(this.props.value)
  }

  render() {
    return (
      <>
        <TextField
          id="datetime-local"
          type="datetime-local"
          // defaultValue="2017-05-24T10:30" // change totodays date
          defaultValue={moment().format('YYYY-MM-d\TH:mm')} // change totodays date
          floatingLabelText='Date And Time'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.props.onChange}
          minDate={new Date()}
        />
        {moment().format('YYYY-MM-d\TH:mm')}
        2017-05-24T10:30
      </>
    );
  }
}

export default ScrollDialog;
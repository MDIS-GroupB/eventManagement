import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import renderHTML from 'react-render-html';//helps render html returned from server in props or var
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import StripeCheckout from 'react-stripe-checkout';

export async function updateState() {
  console.log(+ "is what")
  await this.setState({ open: true })
  console.log("call from the child component" + this.state.open)
}

export default class ViewEventTabs extends React.Component {

  state = {
    open: false,
  }

  async componentDidMount() {
    console.log("my open statee is " + this.state.open)
    console.log("My html = ")
    console.log(this.props.html)
    updateState = updateState.bind(this)
    // console.log(process.env. + "is my env key")
  }

  // componentWillReceiveProps() {
  //   console.log("Will ReceiveProps called")
  //   // updateState = updateState.bind(this)
  //   this.setState({ open: true })
  // }

  // componentDidUpdate() {
  //   console.log("did update called")
  //   updateState()
  // }

  handleClose = () => {
    console.log("fuckin close")
    // console.log()
    this.setState({ open: false });
    console.log(this.state)
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {

    return (
      <>
        <Dialog
          fullScreen
          open={this.state.open}>
          <DialogTitle>Paymenttt</DialogTitle>
          <h1>Im paying now </h1>
          {/* {renderHTML(this.props.html)} */}
          {/* <td dangerouslySetInnerHTML={{ __html: this.props.html }} /> */}
          <StripeCheckout
            token={this.onToken}
          // stripeKey={}
          />
          <RaisedButton onClick={this.handleClose} color="primary" style={{ margin: "auto" }}>
            Cancel
            </RaisedButton>
        </Dialog>
      </>
    )
  }
}

import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import renderHTML from 'react-render-html';

export default class ViewEventTabs extends React.Component {

  async componentDidMount() {
    console.log("My html = ")
    console.log(this.props.html)
  }

  render() {

    return (
      <>
      <Dialog
      open={true}>
      <DialogTitle>Payment</DialogTitle>
      <h1>Im paying now </h1>
      {renderHTML(this.props.html)}
      </Dialog>
      </>
    )
  }
}

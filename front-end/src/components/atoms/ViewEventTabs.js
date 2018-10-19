import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { CircularProgress } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class ViewEventTabs extends React.Component {

  state = {
    tabNo: 0,
  }
  handleChange = (event, value) => {
    this.setState({ tabNo: value });
  };

  render() {

    return (
      <div>
        <AppBar style={{ width: '80%', alignSelf: 'center' }} position="static">
          <Tabs value={this.state.tabNo} onChange={this.handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        {this.state.tabNo === 0 &&
          <Typography component="div" style={{ padding: 8 * 3 }}>Tab 1</Typography>
        }
        {this.state.tabNo === 1 &&
          <Typography component="div" style={{ padding: 8 * 3 }}>Tab 2</Typography>
        }
        {this.state.tabNo === 2 &&
          <Typography component="div" style={{ padding: 8 * 3 }}>Tab 3</Typography>
        }
      </div>
    )
  }
}

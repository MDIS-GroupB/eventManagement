import React from 'react';

const style = {
    border: "2px dashed red"
}

const withBoarder = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return (
                <div style={style}>
                    <WrappedComponent {...this.props} />

                </div>
            )
        }
    }
}

export default withBoarder;
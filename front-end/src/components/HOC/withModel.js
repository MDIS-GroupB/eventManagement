import React from 'react';
import Modal from '../Modal/Modal'

const withModal = (WrappedComponent) => {
    class _WithModel extends React.Component {
        state = {
            isOpen: false
        }

        onShow = (e) => {
            this.setState({
                isOpen: true
            });
        }

        onClose = (e) => {
            this.setState({
                isOpen: false
            })
        }

        render() {
            return (
                <div onClick={(e) => { this.onShow(e) }}>
                    <WrappedComponent {...this.props} />
                    <Modal show={this.state.isOpen} onClose={this.onClose}>
                        <WrappedComponent {...this.props} />
                        {/* ...this.props points to the props been pass from higher component , here points to <Slide /> props */}
                    </Modal>
                </div>
            )
        }
    }

    _WithModel.displayName = "WithModal";
    return _WithModel;
}

export default withModal
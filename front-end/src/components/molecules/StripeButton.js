import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
// import img from '../../imgs/logo'

export default class TakeMoney extends React.Component {
    onToken = (token) => {
        fetch('/save-stripe-token', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            response.json().then(data => {
                console.log(data)
                alert(`We are in business, ${data.email}`);
            });
        });
    }
    render() {
        const stripeKey = "pk_test_RqzhsUSIsZ2vzPUOG15tMaao" //Put in env variable
        return (
            // ...
            <StripeCheckout
                label='Buy'
                token={this.onToken}
                stripeKey={stripeKey}
                name={this.props.eventName} // the pop-in header title
                description={this.props.eventDescription} // the pop-in header subtitle
                // ComponentClass="div"
                panelLabel="Give Money" // prepended to the amount in the bottom pay button
                amount={this.props.price} // cents
                currency="SGD"
                locale="sg"
                shippingAddress
                billingAddress={false}
                // Note: enabling both zipCode checks and billing or shipping address will
                // cause zipCheck to be pulled from billing address (set to shipping if none provided).
                zipCode={false}
                alipay
                bitcoin
                allowRememberMe // "Remember Me" option (default true)
            //     opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
            //     closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
            // // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
            // // you are using multiple stripe keys
            />
        )
    }
}
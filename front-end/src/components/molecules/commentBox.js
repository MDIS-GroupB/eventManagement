import React from 'react'
import { createComment } from "../../api/comment"
import { getComments } from '../../api/comment'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress';

export default class myThing extends React.Component {

    state = {
        comments: "",
        prevComments: null,
    };

    async componentDidMount() {
        console.log("the passed id is " + this.props.passedId)
        let prevComments = await getComments(this.props.passedId)
        console.log("prevComments")
        console.log(prevComments)
        this.setState({ prevComments: prevComments })

        console.log("this is the state")
        console.log(this.state)
        this.onCommentChange = this.onCommentChange.bind(this)
        this.onHandleComment = this.onHandleComment.bind(this)
    }

    onCommentChange = (event) => {
        this.setState({
            comments: event.target.value
        })
    }

    onHandleComment = () => {
        var commentDate = new Date()
        let a = {
            eventId: this.props.passedId,
            comments: this.state.comments,
            commentDate: commentDate.toString().slice(0, 23),
        }
        console.log('==================')
        console.log(a)
        console.log('==================')
        createComment(a);
        this.mainInput.value = "";
        this.componentDidMount();
    }

    render() {
        return (
            <>
                <h2 style={{ color: 'red' }}>Comment Section:</h2>
                {(!!this.state.prevComments) ? (
                    <>
                        {
                            this.state.prevComments.map(comment => {
                                return (
                                    <>
                                        <h4><i>{comment.reviewer} {comment.commentDate}</i></h4>
                                        <h5>{comment.comments}</h5>
                                    </>
                                )
                            })
                        }

                        < form >
                            <textarea
                                placeholder="Comment on this Event"
                                onChange={this.onCommentChange}
                                cols="80" rows="10"
                            >
                            </textarea>
                            <br /> <br />
                            <RaisedButton onClick={this.onHandleComment} type="submit" color="primary" autoFocus style={{ margin: "auto" }}>
                                Comment
                        </RaisedButton>
                        </form> <br /> <br />
                    </>
                ) : (<CircularProgress />)
                }
            </>
        )
    }
}
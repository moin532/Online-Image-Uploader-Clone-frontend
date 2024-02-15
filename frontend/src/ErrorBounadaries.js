import React, { Component } from 'react'

export default class ErrorBounadaries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            info: null,
        }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { error }
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        this.setState({
            error:error,
            info:info,
        })
    }
  render() {
    if(this.state.info){
        return (
            <div>
                <h1>Something went wrong!</h1>
                <details style={{whiteSpace:"pre-wrap"}}>
                    {this.state.error && this.state.error.toString()}
                    <pre>{this.state.errorinfo.componentStack}</pre>
                </details>
            </div>
        )
    }
  }
}

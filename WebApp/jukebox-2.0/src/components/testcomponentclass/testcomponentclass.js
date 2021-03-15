import React from 'react';

class Testcomponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            message: ""
        }
    }

    componentDidMount(){
        fetch("http://localhost:9000/hello")
            .then(res => {
                var txt = res.text()
                console.log(txt);
                return txt;
            })
            .then(res => {
                console.log(res)
                this.setState({
                    message: res
                })
            })
            .catch(err => console.log(err))
    }
    
    
    render(){
        return <p> { this.state.message } </p>
    }
}
export default Testcomponent


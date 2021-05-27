import React, { Children, Component } from 'react';
import Axios from 'axios';

export class Testing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            states: [],
            statedetails: [],
            stateName: ""
        }
    }

    componentDidMount() {

        Axios.get("https://api.covid19india.org/state_district_wise.json")
            .then((res) => {
                this.setState({
                    states: res.data
                })
                console.log(res.data);
            })


    }


    handleActive = () => {
        const { tn } = this.state;
        console.log(tn)
        let count = 0;
        Object.keys(tn).map((item, i) => {
            const newcount = count + tn[item].active;
            count = newcount;
        })
        console.log(count);
    }

    handleChange = (e) => {
        console.log(e.target.value)
        const { stateName, states } = this.state;
        const statenm = e.target.value;


        Object.keys(states).map((item, i) => {
            console.log(states[item])
            if (item === statenm) {
                this.setState({
                    statedetails: states[item].districtData,
                    stateName: statenm
                })
            }
        })

    }

    render() {

        const { states, stateName, statedetails } = this.state;
        console.log(statedetails);
        return (
            <div>
                <h2>Testing</h2>
                <select onChange={this.handleChange}>
                    {
                        Object.keys(states).map((item, i) => {
                            return (
                                <option>{item}</option>
                            )

                        })
                    }
                </select>
                <button onClick={this.handleActive}>Activecheck</button>

                {
                    Object.keys(statedetails).map((item, i) => {
                        return (
                            <div>
                                <h1>{item}</h1>
                                <span>Active Case : {statedetails[item].active}</span><br></br>
                                <span>Confirmed Case : {statedetails[item].confirmed}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Testing

import React, { Component } from 'react';
import './Legend.css'


class Legend extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (

            <div className="legend-field">
                <span className="legend-label">Data availability of facilities</span>
                <br></br>
                <div className="legend-field-text">

                    <div id="color-and-text">
                        <div class="small-box blue"></div>
                        <span>Excellent</span>
                    </div>
                    <div id="color-and-text">
                        <div class="small-box orange"></div>
                        <span>Mediocre</span>
                    </div>
                    <div id="color-and-text">
                        <div class="small-box red"></div>
                        <span>Poor</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Legend
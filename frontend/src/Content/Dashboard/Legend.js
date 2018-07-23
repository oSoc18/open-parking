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

                    <div id="color-and-text" data-tooltip="All 6 necessary fields are filled in." data-tooltip-position="bottom">
                        <div class="small-box blue"></div>
                        <span>Excellent</span>
                    </div>
                    <div id="color-and-text" data-tooltip="3, 4 or 5 fields of 6 are filled in." data-tooltip-position="bottom">
                        <div class="small-box orange"></div>
                        <span>Mediocre</span>
                    </div>
                    <div id="color-and-text" data-tooltip="Less than half the fields are filled in." data-tooltip-position="bottom">
                        <div class="small-box red"></div>
                        <span>Poor</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Legend
import React, {useState} from "react";
import "../styles/style_app.css";

export default function Tabs(props){
    return(
            <div className="forecast-tabs" onClick = {props.toggleTabSwitch}>
                <p className="forecast-day-tab">8 Hours</p>
                    <div className="button-change">
                        <div className={"circle-left " + (props.tabSwitch ? "unavailable" : "")}></div>
                        <div className={"circle-right " + (props.tabSwitch ? "" : "unavailable")}></div>
                    </div>
                    <p className="forecast-week-tab">4 Days</p>
            </div>
    )
}
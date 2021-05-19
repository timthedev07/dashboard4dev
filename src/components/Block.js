import React from "react";

import Map from "../helper/Middleman";

export default function Block(props) {
    let Icon = Map[props.iconName];
    return (
        <a href={props.href}>
            <div className="link-block">
                <Icon className={"link-icon " + props.iconName + "-icon"} />
            </div>
        </a>
    );
}

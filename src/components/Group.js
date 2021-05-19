import React from "react";

export default function Group(props) {
    return (
        <div
            className={`link-groups group-${props.groupName
                .replace(/ /g, "-")
                .toLowerCase()}`}
        >
            <h3 className="group-name">{props.groupName}</h3>
            {props.children}
        </div>
    );
}

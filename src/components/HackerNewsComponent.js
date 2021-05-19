import React, { useState, useEffect } from "react";
import { getStoryIds } from "../services/HackerNews";
import Story from "./Story";

export default function HackerNewsComponent(props) {
    const [storyIds, setStoryIds] = useState([]);

    useEffect(() => {
        getStoryIds().then((ids) => setStoryIds(ids.slice(0, 20)));
    }, []);

    return (
        <div
            className={`link-groups group-${props.groupName
                .replace(/ /g, "-")
                .toLowerCase()}`}
        >
            <h3 className="group-name">{props.groupName}</h3>
            {storyIds.map((storyId) => {
                return <Story key={storyId} storyId={storyId} />;
            })}
        </div>
    );
}

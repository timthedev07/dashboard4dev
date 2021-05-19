import React from "react";
import { getStory } from "../services/HackerNews";

export default function Story(props) {
    const [storyData, setStoryData] = React.useState({});

    React.useEffect(() => {
        getStory(props.storyId).then((res) => {
            if (res && res.url) {
                setStoryData(res);
            }
        });
    }, [props.storyId]);

    return !storyData.url ? null : (
        <a className="story-wrapper-url" href={storyData.url}>
            <div className="story">{storyData.title}</div>
        </a>
    );
}

import axios from "axios";

// const LIMIT = 20;

export const BASE_URL = "https://hacker-news.firebaseio.com/v0";
export const NEW_STORIES_URL = `${BASE_URL}/newstories.json`;
export const STORY_URL = `${BASE_URL}/item/`;

export const getStory = async (storyId) => {
    const res = await axios
        .get(`${STORY_URL + storyId}.json`)
        .then(({ data }) => data);
    return res;
};

export const getStoryIds = async () => {
    const res = await axios
        .get(NEW_STORIES_URL)
        .then(({ data }) => data)
        .catch((err) => {
            console.log(err);
            return err;
        });
    return res;
};

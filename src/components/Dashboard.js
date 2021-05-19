import React from "react";
import Resources from "../Resources.json";
import Block from "./Block";
import Group from "./Group";
import { useThemeManager } from "../context/ThemeContext";

import "bootstrap/dist/css/bootstrap.min.css";
import HackerNewsComponent from "./HackerNewsComponent";
import { Dropdown } from "react-bootstrap";

export default function Dashboard() {
    const themeContext = useThemeManager();

    const handleToggle = () => {
        themeContext.toggleMode();
    };

    const changeTheme = (key) => {
        console.log(key);
        themeContext.updateTheme(key);
    };

    const capitalize = (s) => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const blocks = Resources.map((category) => {
        return (
            <Group groupName={category.category} key={category.category}>
                <div className="links-wrapper">
                    {category.content.map((obj) => {
                        return (
                            <Block
                                href={obj.url}
                                iconName={obj.name}
                                key={obj.name}
                            />
                        );
                    })}
                </div>
            </Group>
        );
    });

    /**
     *
     * @param {string} themeName
     * @returns
     */
    const processThemeName = (themeName) => {
        if (typeof themeName !== "string") return;
        return capitalize(themeName.toLowerCase().replace(/-/g, " "));
    };

    const themeOptions = themeContext.ALL_THEMES.map((themeName) => {
        if (themeName !== themeContext.theme) {
            return (
                <Dropdown.Item
                    key={themeName}
                    eventKey={themeName}
                    className="nav-dropdown-item"
                >
                    {processThemeName(themeName)}
                </Dropdown.Item>
            );
        } else {
            return null;
        }
    });
    // filter out the selected theme
    themeOptions.filter((word) => word);

    return (
        <div id="dashboard-container">
            <div
                className="bg"
                style={{
                    visibility:
                        themeContext.mode === "day" ? "visible" : "hidden",
                }}
                id={`${themeContext.theme}-day`}
            ></div>
            <div
                className="bg"
                style={{
                    visibility:
                        themeContext.mode === "day" ? "hidden" : "visible",
                }}
                id={`${themeContext.theme}-night`}
            ></div>
            <>
                <div id="mode-toggle-container" data-mode={themeContext.mode}>
                    <div className="custom-control custom-switch">
                        <input
                            onChange={() => handleToggle()}
                            type="checkbox"
                            defaultChecked={themeContext.mode === "night"}
                            className="custom-control-input"
                            id="customSwitch1"
                        />
                        <label
                            data-mode={themeContext.mode}
                            className="custom-control-label"
                            htmlFor="customSwitch1"
                        >
                            <span id="mode-emoji">
                                {themeContext.mode === "day" ? "🌞" : "🌝"}
                            </span>
                            &nbsp;Dark Mode
                        </label>
                    </div>
                    <Dropdown id="theme-dropdown" onSelect={changeTheme}>
                        <Dropdown.Toggle
                            variant={
                                themeContext.mode === "day" ? "light" : "dark"
                            }
                        >
                            {processThemeName(themeContext.theme)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>{themeOptions}</Dropdown.Menu>
                    </Dropdown>
                </div>

                <div id="groups-container">
                    {blocks}
                    <HackerNewsComponent groupName="Daily News"></HackerNewsComponent>
                </div>
            </>
        </div>
    );
}

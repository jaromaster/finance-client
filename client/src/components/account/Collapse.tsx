import React, { useState } from "react";
import "./Collapse.css";


/**
 * Collapse stores content, which is passed as children to make it collapseable
 */
const Collapse = (props: any) => {
    // state to toggle if content should be hidden
    const [hidden, setHidden] = useState(true);

    // on every click (button): toggle if content should be visible
    const toggle_visible = () => {
        setHidden(!hidden); // reverse: true->false, false->true
    }

    // content is hidden
    if (hidden){
        return (
            <div className="Collapse">
                <button className="Collapse-Button" onClick={(e)=> toggle_visible()}>{props.title}</button>
            </div>
        )
    }

    // content is shown
    return (
        <div className="Collapse">
            <button className="Collapse-Button" onClick={(e)=> toggle_visible()}>{props.title}</button>
            <div className="Collapse-Content">
                {props.children}
            </div>
        </div>
    )
}

export default Collapse;
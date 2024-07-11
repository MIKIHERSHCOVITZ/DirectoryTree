import './Tree.css';
import React, { useState, useEffect } from 'react';

const Tree = ({ root, level, mode, initialExpanded = true, setChildState = null, selected, setSelected }) => {

    // use state hooks to set and use the relevant states - expand and state of his childrens
    const [Expanded, setExpanded] = useState(initialExpanded);
    const [childrenStates, setChildrenStates] = useState({});

    // useeffect hook to update the parent on the current expanded state
    useEffect(() => {
        if (setChildState) {
            setChildState(mode === "closeAll" ? false : Expanded);
        }
    }, [Expanded, setChildState, mode]);


    // function to change expand state onclick - in closeAll we close all childrens
    const changeExpandState = () => {
        if (Expanded && mode === "closeAll") {
            setChildrenStates({});
        }
        setExpanded(!Expanded);
    };


    // function to update state of child "index"
    const changeChildrenState = (index, state) => {
        setChildrenStates((prevStates) => ({
            ...prevStates,
            [index]: state
        }));
    };


    // handle select for task 5
    const handleSelect = () => {
        setSelected(root.name);
    };

    return (
        <div className={`tree-node level-${level}`}>
            <div className={`tree-node-label ${selected === root.name && root.name.includes(".") ? 'selected' : ''}`} onClick={handleSelect}>
              {root.type === "folder" && (
                <button className="button" onClick={changeExpandState}>
                    {Expanded ? '-' : '+'}
                </button>
            )}
            <span>
                {root.name}
            </span>
            </div>
            {root.type === "folder" && Expanded && (
                <div className="tree-node-children">
                    {root.children.map((child, index) => (
                        <Tree
                            root={child}
                            level={level + 1}
                            mode={mode}
                            initialExpanded={childrenStates[index] !== undefined ? childrenStates[index] : mode !== "closeAll"}
                            setChildState={(state) => changeChildrenState(index, state)}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tree;
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./SearchedElement.css";
import { FaCheck } from "react-icons/fa";

const SearchedElement = ({ input, element }) => {
    const [title, setTitle] = useState(false);
    let timeoutref = useRef(null);


    useEffect(() => {
                
                timeoutref.current = setTimeout(() =>{
                    setTitle(false)
                },2000)
                return ()=> {clearTimeout(timeoutref.current)};
            },[title])

    const splitted = useMemo(() => {
        if (input && element.name) {
            const regex = new RegExp(`(${input})`, "gi");
            return element.name.split(regex);
        }
        else {
            return null;
        }
    }, [input, element])


    const handleClickTitle = () => {
        setTitle(true)
        }


    return (
        <div className="element">
            <div className="usericon">
                <element.icon size={11} color="#9e9e9e" />
                {element.type === "people" && (
                    <div className={element.isActive ? "Personactive" : "PersonInactive"}></div>
                )}
            </div>

            <div className="elementdetails">
                <div className="elementname">
                    <p className="">
                        {splitted &&
                            splitted.map((cur, index) =>
                                cur.toLowerCase() === input.toLowerCase() ? (
                                    <span key={index} className="highlight">
                                        {cur}
                                    </span>
                                ) : (
                                    <span key={index}>{cur}</span>
                                )
                            )}
                        &nbsp; </p>
                    <div className="filesCount">
                        {
                            element.type === 'file' && element.fileType === 'folder' && <p> {`${element.filescount} files`}</p>
                        }
                    </div>
                </div>


                <div className="elementin">
                    {element.type === "people" ? (
                        element.isActive ? (
                            <p>Active now</p>
                        ) : (
                            <p>{element.lastActive}</p>
                        )
                    ) : element.type === "file" ? (
                        <> <p>{`in ${element.parentFolder} `}&nbsp;</p>
                            <div className="dot"></div>
                            <p> &nbsp;{` ${element.action}`}</p> </>
                    ) : element.type === "chat" ? (
                        <p>{`@${element.from}`}</p>
                    ) : element.type === "list" ? (
                        <p>{`Tasks completed ${element.completedCount}`}</p>
                    ) : null}
                </div>
            </div>

            <div className="elementuse">
                <div className="copyLink" onClick={() => handleClickTitle()}>
                    {
                        title && <div className="copylinkTitle"> <FaCheck size={10} color="#9e9e9e" /><p> Link copied!</p>  </div>
                    }
                    <element.copylink size={15} color="#9e9e9e" />
                </div>
                <div className="newWindow">
                    <element.newWindow size={15} color="#9e9e9e" />
                    <p>New Tab</p>
                </div>


            </div>
        </div>
    );
};


export default SearchedElement;
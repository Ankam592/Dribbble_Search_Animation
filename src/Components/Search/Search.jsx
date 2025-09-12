import React, { useState, useMemo, useEffect,Suspense } from "react";
import "./Search.css";
import { dataArray } from "../../assets/data";

import { motion, AnimatePresence, easeInOut } from "framer-motion";
const SearchedElement = React.lazy(() => import('../SearchedElement/SearchedElement'))
const SkeletonCard = React.lazy(() => import('../SkeletonCard/SkeletonCard'))
import { useItemLength } from "../../Hooks/ItemLength";
const Toggle = React.lazy(() => import('../Toggle/Toggle'))

import { FaPaperclip, FaUser, FaRegCommentDots, FaListUl, FaCog } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";

 const Search = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchedData, setSearchedData] = useState([]);
    const [activeItem, setactive] = useState('All');
    const [IsOpen, setOpen] = useState(false);
    const [people, setPeople] = useState(false)
    const [file, setFile] = useState(false)
    const [chat, setChat] = useState(false)
    const [list, setList] = useState(false)

    const items = [
        {
            name: "All",
            isActive: true,
            icon: ''
        },
        {
            name: "Files",
            isActive: false,
            icon: <FaPaperclip size={15} color="#9e9e9e" />
        },
        {
            name: "People",
            isActive: false,
            icon: <FaUser size={15} color="#9e9e9e" />
        },
        {
            name: "Chat",
            isActive: false,
            icon: <FaRegCommentDots size={15} color="#9e9e9e" />
        },
        {
            name: "List",
            isActive: false,
            icon: <FaListUl size={15} color="#9e9e9e" />
        }];




    // Filtered results
    const filteredData = useMemo(() => {
        if (input === "") return [];
        return dataArray.filter((current) =>
            current.name.toLowerCase().includes(input.toLowerCase())
        );
    }, [input]);



    // Fake backend delay
    useEffect(() => {
        if (input === "") {
            setLoading(false);
            setSearchedData([]);
            return;
        }

        setLoading(true);
        const timer = setTimeout(() => {
            setSearchedData(filteredData);
            setLoading(false);
        }, 1000); // 1.2s delay

        return () => clearTimeout(timer);
    }, [input, filteredData]);

    return (

        <AnimatePresence mode="wait">
            <motion.div
                layout
                transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
                className="content" >
                {/* 🔍 Search bar */}
                <div className="search_div">
                    <div className="icon">
                        {loading ? (
                            <motion.div
                                style={{
                                    width: 15, height: 15, border: "3px solid #f3f3f3", borderTop: "3px solid #9e9e9e", borderRadius: "50%"
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                            >
                                {/* <FiSearch size={25} className="search_icon" /> */}
                            </motion.div>
                        ) : (
                            <FiSearch size={21} className="search_icon" />

                        )}
                    </div>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Searching is easier"
                        className="search_inp"
                        style={input ? { color: "black" } : null}
                    />

                    {/* Clear vs Quick Access */}
                    <AnimatePresence mode="wait">
                        {!input ? (
                            <motion.div
                                key="quickaccess-group"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ display: "flex", gap: "10px" }}
                            >
                                <div className="icn">
                                    <div className="inner_icn">
                                        <p>s</p>
                                    </div>
                                </div>
                                <div className="quick_access">
                                    <p>quick access</p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="clear-group"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{ display: "flex" }}
                                className="clr"
                            >
                                <div className="clear">
                                    <a className="anchor_clear" onClick={() => setInput("")}>
                                        Clear
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* 🔄 Results / Skeleton */}
                <motion.div layout className="searched_div">

                    {input && <div className="fit"><div className="Types">
                        <div className={activeItem === 'All' ? "Item active" : "Item"} onClick={() => setactive('All')}>
                            <div> <h1 className={activeItem === 'All' ? "content_ active" : "Content"}>All</h1></div>
                            <div className="Count">  <p className="count">{filteredData.length}</p></div>
                        </div>
                        {file && <div className={activeItem === 'file' ? "Item active" : "Item"} onClick={() => setactive('file')}>
                            <div className="con"><FaPaperclip size={15} color="#9e9e9e" /></div>
                            <div> <h1 className={activeItem === 'file' ? "content_ active" : "Content"}>Files</h1></div>
                            <div className="Count">  <p className="count">{filteredData && useItemLength(filteredData, 'file')}</p></div>
                        </div>}
                        {people && <div className={activeItem === 'people' ? "Item active" : "Item"} onClick={() => setactive('people')}>
                            <div className="con"> <FaUser size={15} color="#9e9e9e" /></div>
                            <div> <h1 className={activeItem === 'people' ? "content_ active" : "Content"}>People</h1></div>
                            <div className="Count">   <p className="count">{filteredData && useItemLength(filteredData, 'people')}</p></div>
                        </div>}
                        {chat && <div className={activeItem === 'chat' ? "Item active" : "Item"} onClick={() => setactive('chat')}>
                            <div className="con"> <FaRegCommentDots size={15} color="#9e9e9e" /></div>
                            <div> <h1 className={activeItem === 'chat' ? "content_ active" : "Content"}>Chat</h1></div>
                            <div className="Count">  <p className="count">{filteredData && useItemLength(filteredData, 'chat')}</p></div>
                        </div>}
                        {list && <div className={activeItem === 'list' ? "Item active" : "Item"} onClick={() => setactive('list')}>
                            <div className="con"><FaListUl size={15} color="#9e9e9e" /></div>
                            <div> <h1 className={activeItem === 'list' ? "content_ active" : "Content"}>List</h1></div>
                            <div className="Count">  <p className="count">{filteredData && useItemLength(filteredData, 'list')}</p></div>
                        </div>}


                    </div><div className="settings">  <FaCog size={15} color="#9e9e9e" onClick={() => setOpen(prev => !prev)} />

                            {IsOpen && (
                                <div className="dropdown">
                                    <div>

                                        <div className="con"><FaPaperclip size={15} color="#9e9e9e" /></div>
                                        <div className="hdiv"><h1>Files</h1></div>

                                        <Suspense fallback={<div>Loading...</div>}>
                                            <Toggle isOn={file} setisOn={setFile} />
                                        </Suspense>

                                    </div>
                                    <div>
                                        <div className="con"> <FaUser size={15} color="#9e9e9e" /></div>
                                        <div className="hdiv"><h1>People</h1></div>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <Toggle isOn={people} setisOn={setPeople} />
                                        </Suspense>

                                    </div>

                                    <div>
                                        <div className="con"> <FaRegCommentDots size={15} color="#9e9e9e" /></div>
                                        <div className="hdiv"><h1>Chats</h1></div>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <Toggle isOn={chat} setisOn={setChat} />
                                        </Suspense>

                                    </div>

                                    <div>
                                        <div className="con"><FaListUl size={15} color="#9e9e9e" /></div>
                                        <div className="hdiv"><h1>Lists</h1></div>
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <Toggle isOn={list} setisOn={setList} />
                                        </Suspense>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                    }
                    <div className="FrScroll">
                        <AnimatePresence>
                            {(loading) &&
                                Array.from({ length: 6 }).map((_, i) => (
                                    <motion.div
                                        key={`skeleton-${i}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}
                                        className="searchedElement"
                                    >
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <SkeletonCard />
                                        </Suspense>
                                    </motion.div>
                                ))}
                        </AnimatePresence>

                        <AnimatePresence>
                            {(!loading) &&
                                searchedData.map((current, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="searchedAfterLoadElement"
                                    >
                                        {activeItem === 'All' ? <Suspense fallback={<div>Loading...</div>}>
                                            <SearchedElement input={input} element={current} />
                                        </Suspense> :

                                            activeItem === current.type && <Suspense fallback={<div>Loading...</div>}>
                                                <SearchedElement input={input} element={current} />
                                            </Suspense>
                                        }
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>

    );
};


export default Search;
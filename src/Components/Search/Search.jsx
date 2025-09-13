import React, { useState, useMemo, useEffect, Suspense } from "react";
import "./Search.css";
import { dataArray } from "../../assets/data";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { FaPaperclip, FaUser, FaRegCommentDots, FaListUl, FaCog } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { useItemLength } from "../../Hooks/ItemLength";

const Toggle = React.lazy(() => import('../Toggle/Toggle'))
const SearchedElement = React.lazy(() => import('../SearchedElement/SearchedElement'))
const SkeletonCard = React.lazy(() => import('../SkeletonCard/SkeletonCard'))

let debounceTimer; // 👈 lives outside the component (persists)
const debounce = (fn, delay) => {
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};


const Search = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeItem, setactive] = useState('All');
    const [IsOpen, setOpen] = useState(false);
    const [people, setPeople] = useState(false)
    const [fcount, setFcount] = useState(0);
    const [file, setFile] = useState(true)
    const [pcount, setPcount] = useState(0);
    const [chat, setChat] = useState(false)
    const [ccount, setCcount] = useState(0);
    const [list, setList] = useState(false)
    const [lcount, setLcount] = useState(0);
    const [count, setCount] = useState(0);


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
            return;
        }
        const filescount = useItemLength(filteredData, 'file');
        const peoplecount = useItemLength(filteredData, 'people');
        const chatcount = useItemLength(filteredData, 'chat');
        const listcount = useItemLength(filteredData, 'list');
        setLoading(true)

        setCount(0);
        setFcount(0);
        setPcount(0);
        setCcount(0);
        setLcount(0);

        const timer = setTimeout(() => {
            setLoading(false);

        }, 1000); // 1.2s delay



        return () => {
            clearTimeout(timer)
        }
    }, [input, filteredData]);


    const handleSearch = (value) => {
    }

    const deb = debounce(handleSearch, 2000)


    return (
        <AnimatePresence mode="wait">
            <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}   // 👈 add this for closing
                transition={{ layout: { duration: 1, ease: "easeInOut" } }}
                className="content" >
                {/* 🔍 Search bar */}

                <div className="search_div">
                    <div className="div_fit">
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

                                </motion.div>
                            ) : (
                                <FiSearch size={21} className="search_icon" />

                            )}
                        </div>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value)
                                deb(e.target.value)
                            }}
                            placeholder="Searching is easier"
                            className="search_inp"
                            style={input ? { color: "black" } : null}
                        />
                    </div>

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
                {input && <div className="searched_div">

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
                        <AnimatePresence mode="wait">
                            {(() => {
                                const visibleItems =
                                    activeItem === "All"
                                        ? filteredData
                                        : filteredData.filter((it) => it.type === activeItem);

                                const slots = Math.max(6, visibleItems.length);

                                return Array.from({ length: slots }).map((_, i) => {
                                    const item = visibleItems[i];

                                    return (
                                        <motion.div
                                            key={`slot-${i}-${item?.id ?? "skeleton"}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.4, delay: i * 0.08 }}
                                            className={item ? "searchedAfterLoadElement" : "searchedElement"}
                                        >
                                            <Suspense fallback={<div>Loading...</div>}>
                                                {loading || !item ? (
                                                    <SkeletonCard />
                                                ) :  (
                                                    <SearchedElement input={input} element={item} />
                                                )}
                                            </Suspense>
                                        </motion.div>
                                    );
                                });
                            })()}
                        </AnimatePresence>
                    </div>


                </div>}
            </motion.div>
        </AnimatePresence>

    );
};


export default Search;
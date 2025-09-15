import React, { useState, useMemo, useEffect, Suspense } from "react";
import "./Search.css";
import { dataArray } from "../../assets/data";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperclip, FaUser, FaRegCommentDots, FaListUl, FaCog } from 'react-icons/fa';
import { useItemLength } from "../../Hooks/ItemLength";
import { AiFillSetting, AiOutlineSetting } from "react-icons/ai";

// Lazy loaded components (code-splitting for performance)
const SearchInput = React.lazy(() => import('../SearchInput/SearchInput'))
const SearchedElement = React.lazy(() => import('../SearchedElement/SearchedElement'))
const SkeletonCard = React.lazy(() => import('../SkeletonCard/SkeletonCard'))
const Dropdown = React.lazy(() => import('../Dropdown/Dropdown'))

const Search = () => {
    // Core states
    const [input, setInput] = useState("");       // Search text
    const [loading, setLoading] = useState(false); // Skeleton/loader toggle
    const [activeItem, setactive] = useState('All'); // Active filter tab
    const [IsOpen, setOpen] = useState(false);    // Dropdown open/close
    const [outerDone, setOuter] = useState(false);
    const [innerAnimationdone, setInnerAnimation] = useState(false);

    // Toggle states for filters
    const [people, setPeople] = useState(false)
    const [file, setFile] = useState(true)
    const [chat, setChat] = useState(false)
    const [list, setList] = useState(false)

    // Count states
    const [fcount, setFcount] = useState(0);
    const [pcount, setPcount] = useState(0);
    const [ccount, setCcount] = useState(0);
    const [lcount, setLcount] = useState(0);
    const [count, setCount] = useState(0); // Total count

    // Filtered results memoized for performance
    const filteredData = useMemo(() => {
        if (input === "") return [];
        return dataArray.filter((current) =>
            current.name.toLowerCase().includes(input.toLowerCase())
        );
    }, [input]);

    // Items list for tabs
    const items = [
        { key: "All", label: "All", icon: null, show: true, count: count, toggle: null },
        { key: "file", label: "Files", icon: <FaPaperclip size={15} color="#9e9e9e" />, show: file, count: fcount, toggle: setFile },
        { key: "people", label: "People", icon: <FaUser size={15} color="#9e9e9e" />, show: people, count: pcount, toggle: setPeople },
        { key: "chat", label: "Chat", icon: <FaRegCommentDots size={15} color="#9e9e9e" />, show: chat, count: ccount, toggle: setChat },
        { key: "list", label: "List", icon: <FaListUl size={15} color="#9e9e9e" />, show: list, count: lcount, toggle: setList },
    ];

    // Fake backend delay simulation + animated counters
    useEffect(() => {
        if (input === "") {
            setLoading(false);
            return;
        }

        // Count items by category
        const filescount = useItemLength(filteredData, 'file');
        const peoplecount = useItemLength(filteredData, 'people');
        const chatcount = useItemLength(filteredData, 'chat');
        const listcount = useItemLength(filteredData, 'list');

        // Start loading state
        setInnerAnimation(false);
        setLoading(true)

        // Increment counters gradually (for smooth animation)
        let f = 0, p = 0, c = 0, l = 0, t = 0;
        let totalInterval, finterval, pinterval, cinterval, linterval;

        if (filteredData.length > 0) {
            totalInterval = setInterval(() => {
                t = t + 1;
                setCount(t);
                if (t === filteredData.length) clearInterval(totalInterval);
            }, 800 / filteredData.length);

            filescount > 0 ? finterval = setInterval(() => {
                f = f + 1;
                setFcount(f);
                if (f >= filescount) clearInterval(finterval);
            }, 800 / filescount) : setFcount(0)

            peoplecount > 0 ? pinterval = setInterval(() => {
                p = p + 1;
                setPcount(p);
                if (p >= peoplecount) clearInterval(pinterval);
            }, 800 / peoplecount) : setPcount(0)

            chatcount > 0 ? cinterval = setInterval(() => {
                c = c + 1;
                setCcount(c);
                if (c >= chatcount) clearInterval(cinterval);
            }, 800 / chatcount) : setCcount(0)

            listcount > 0 ? linterval = setInterval(() => {
                l = l + 1;
                setLcount(l);
                if (l >= listcount) clearInterval(linterval);
            }, 800 / listcount) : setLcount(0)
        } else {
            setCount(0)
            setFcount(0)
            setCcount(0)
            setPcount(0)
            setLcount(0)
        }

        const timer = setTimeout(() => { setLoading(false) }, 800);

        return () => {
            clearTimeout(timer)
            clearInterval(totalInterval);
            clearInterval(finterval);
            clearInterval(pinterval);
            clearInterval(cinterval);
            clearInterval(linterval);
        }
    }, [input, filteredData]);

    return (
        <AnimatePresence>
            <motion.div
                className="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* 🔹 Search Input */}
                <SearchInput loading={loading} input={input} setInput={setInput} />

                {/* 🔹 Results / Skeleton */}
                <AnimatePresence>
                    {input && (
                        <motion.div
                            className="searched_div"
                            initial={{ opacity: 1, scaleY: 1 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            style={{ transformOrigin: "bottom" }}
                        >
                            {/* 🔹 Filter Tabs */}
                            <div className="fit">
                                <div className="Types">
                                    {items.map(item => (
                                        item.show && (
                                            <div
                                                key={item.key}
                                                className={activeItem === item.key ? "Item active" : "Item"}
                                                onClick={() => setactive(item.key)}
                                            >
                                                {item.icon && <div className="con">{item.icon}</div>}
                                                <div>
                                                    <h1 className={activeItem === item.key ? "content_ active" : "Content"}>
                                                        {item.label}
                                                    </h1>
                                                </div>
                                                <div className="Count">
                                                    <p className="count">{item.count}</p>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>

                                {/* 🔹 Settings Dropdown */}
                                <div className="settings" style={{ position: "relative", width: 20, height: 20 }}>
                                    <motion.div
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        animate={{ rotate: IsOpen ? 90 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <FaCog size={15} color="#9e9e9e" onClick={() => setOpen(prev => !prev)} />
                                    </motion.div>
                                    <Dropdown items={items} IsOpen={IsOpen} />
                                </div>
                            </div>

                            {/* 🔹 Search Results */}
                            <div className="FrScroll">
                                <AnimatePresence mode="wait">
                                    {(() => {
                                        const dataItems =
                                            activeItem === "All"
                                                ? filteredData
                                                : filteredData.filter(it => it.type === activeItem);

                                        const slots = Array.from(
                                            { length: Math.max(dataItems.length, 6) },
                                            (_, i) => dataItems[i] ?? null
                                        );

                                        return slots.map((item, i) => (
                                            <motion.div
                                                key={`${item ? `data-${item.id}` : `skeleton-${i}`}-${input}-${activeItem}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                                className={item ? "searchedAfterLoadElement" : "searchedElement"}
                                            >
                                                {item ? (
                                                    <SearchedElement input={input} element={item} />
                                                ) : (
                                                    <SkeletonCard />
                                                )}
                                            </motion.div>
                                        ));
                                    })()}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>





    );
};

export default Search;

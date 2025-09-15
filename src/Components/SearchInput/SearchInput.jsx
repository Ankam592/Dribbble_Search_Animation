import React from "react"
import { FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../SearchInput/SearchInput.css"

// SearchInput component with loading spinner, input box, and quick access/clear options
// Props: 
//   - loading (boolean): shows spinner when true, search icon otherwise
//   - input (string): current input text
//   - setInput (function): setter to update input value
const SearchInput = ({ loading, input, setInput }) => {
    return (
        <div className="search_div">

            {/* Search icon or loader */}
            <div className="div_fit">
                <div className="icon">
                    {loading ? (
                        // Loader animation when searching
                        <motion.div
                            style={{
                                width: 15, height: 15, border: "3px solid #f3f3f3", borderTop: "3px solid #9e9e9e", borderRadius: "50%"
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            exit={{ opacity: 0, transition: { duration: 0.4 } }}  >
                        </motion.div>
                    ) : (
                        // Search icon when not loading
                        <FiSearch size={21} className="search_icon" />
                    )}
                </div>

                {/* Input field */}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Searching is easier"
                    className="search_inp"
                    style={input ? { color: "black" } : null} />
            </div>

            {/* Quick access section when input is empty / Clear button when input is filled */}
            <AnimatePresence mode="wait">
                {!input ? (
                    // Quick access shown when no input
                    <motion.div
                        key="quickaccess-group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: "flex", gap: "10px" }}   >
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
                    // Clear button shown when input has text
                    <motion.div
                        key="clear-group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: "flex" }}
                        className="clr">
                        <div className="clear">
                            <a className="anchor_clear" onClick={() => setInput("")}>Clear</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SearchInput;

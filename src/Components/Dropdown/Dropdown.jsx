import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Toggle from "../Toggle/Toggle";
import "../Dropdown/Dropdown.css";

const Dropdown = ({ items, IsOpen }) => {
    const opj = [...items];
    opj.shift();

    return (

        <AnimatePresence mode="wait">
            {IsOpen &&
                <motion.div
                    key="dropdown"
                    className="dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {opj.map((Cur, index) => (
                        <motion.div
                            className="drop"
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <div className="con">{Cur.icon}</div>
                            <div className="hdiv">
                                <h1>{Cur.label}</h1>
                            </div>

                            <div
                                className={`toggle${Cur.show ? "on" : "off"}`}
                                onClick={() => Cur.toggle((prev)=>!prev)}  // toggle from parent
                            >
                                <div className="toggle-circle" >
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>}
        </AnimatePresence>
    );
};

export default Dropdown;

import React from "react";
import { MdAssignment } from "react-icons/md";
import {motion} from "framer-motion";

const Header = () => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    }} className="navbar px-4 sticky top-0 bg-indigo-300">
      <>
        <MdAssignment size={25} className="mr-2 text-rose-600 cursor-pointer" />
        <p className="text-xl font-bold text-white">Task Management</p>
      </>
    </motion.div>
  );
};

export default Header;

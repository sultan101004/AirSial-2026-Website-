import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "transparent",
            border: "1px solid #C0985A",
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "rgba(192, 152, 90, 0.1)",
            border: "1px solid #C0985A",
        }
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            height: 8,
            width: 8,
            backgroundColor: "#C0985A"
        },
        hover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            height: 8,
            width: 8,
            backgroundColor: "#C0985A"
        }
    };

    return (
        <>
            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                variants={dotVariants}
                animate={isHovering ? "hover" : "default"}
                transition={{ type: "spring", stiffness: 1000, damping: 50 }} // Faster follow
            />
        </>
    );
};

export default Cursor;

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useCycle } from 'framer-motion';
import ReactGA from 'react-ga4';

// Sidebar animation variants
const sidebarVariants = {
  open: {
    clipPath: `circle(150% at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const menuItemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { stiffness: 1000, velocity: -100 },
  },
  closed: {
    opacity: 0,
    y: 50,
    transition: { stiffness: 1000 },
  },
};

const NewSide = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  const handleMenuToggle = () => {
    ReactGA.event({
      category: 'User',
      action: 'Click',
      label: 'Button Click',
    });
    toggleOpen();
  };

  return (
    <section className="side-nav">
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        ref={containerRef}
        className="nav-container"
      >
        <motion.div className="background" />
        <div className="side-nav-container">
          <ul>
            {['/', '/about', '/projects', '/service', '/contact'].map((path, index) => (
              <motion.li
                key={index}
                variants={menuItemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={path} onClick={handleMenuToggle}>
                  {path === '/'
                    ? 'Home'
                    : path.charAt(1).toUpperCase() + path.slice(2)}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="mobile-hamb" onClick={handleMenuToggle}>
          <motion.svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            animate={isOpen ? 'open' : 'closed'}
          >
            <motion.path
              variants={{
                closed: { d: 'M 2 2.5 L 20 2.5' },
                open: { d: 'M 3 16.5 L 17 2.5' },
              }}
              stroke="white"
              strokeWidth="2"
            />
            <motion.path
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
              stroke="white"
              strokeWidth="2"
            />
            <motion.path
              variants={{
                closed: { d: 'M 2 16.346 L 20 16.346' },
                open: { d: 'M 3 2.5 L 17 16.346' },
              }}
              stroke="white"
              strokeWidth="2"
            />
          </motion.svg>
        </div>
      </motion.nav>
    </section>
  );
};

export default NewSide;

import React, { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import "./Dropdown.css";

type DropdownProps = {
  value: any;
  options: any;
  placeholder?: any;
  onChange: (param: any) => any;
};

const Dropdown: React.FC<DropdownProps> = props => {
  const { value, options, placeholder = "Select", onChange } = props;
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // Check if we clicked outside of the component
    if (null !== dropRef.current && !dropRef.current.contains(target)) {
      setOpen(false);
    }
  };

  const handleChange = (selectedValue: any) => {
    onChange(selectedValue); // Return our value to parent
    setOpen(false); // Close the dropdown
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const renderMenu = () => {
    const MenuItems = options.map((menuItem: any, index: number) => (
      <li
        key={index}
        className="dropdown__item"
        onClick={_ => handleChange(menuItem)}
      >
        {menuItem}
      </li>
    ));

    return <ul className="dropdown__menu">{MenuItems}</ul>;
  };

  return (
    <div ref={dropRef} className="dropdown">
      <button className="dropdown__toggle" onClick={_ => setOpen(!open)}>
        {value || placeholder} <p className="dropdown__arrow">▼</p>
      </button>
      {open && renderMenu()}
    </div>
  );
};

export default Dropdown;

import {useState} from "react";

import "./Dropdown.css";

type Options = {
  label: string,
  value: string
}

interface DropdownProps {
  onSelect: (value: string) => void,
  options: Options[]
}

const Dropdown : React.FC<DropdownProps> = ({options, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string, label: string) => {
    setSelectedValue(label);
    onSelect(value);
    setIsOpen(false);
  };

  return(
    <div className="dropdown">
      <button className="dropdown-button" onClick={handleToggle}>
        {selectedValue || "Filter Accounts"}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
              className="dropdown-item"
              onClick={() => handleOptionClick(option.value, option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown;
import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BiChevronUp } from 'react-icons/bi';

const MenuItem = (props) => {
    const [showSubItems, setShowSubItems] = useState(false);
    const hasSubItems = props.item.children && props.item.children.length > 0;

    const handleItemClick = () => {
        setShowSubItems(!showSubItems);
    };

    return (
        <li className='mb-3 '>
            <div className={`flex items-center w-full pointer rounded-sm bg-[#1a151eb3] ${props.isShow ? "justify-between" : "justify-center"} `}>
                {!props.item.link && (
                    <div className={`h-[40px]  flex items-center gap-3 ${props.isShow ? "ps-3" : ""}`}>
                        {props.item.image && <img src={props.item.image} className="w-6 h-6" />}

                        <span onClick={handleItemClick} className={`transition-opacity  ${props.isShow ? "block opacity-[1]" : "hidden opacity-[0]"}`}>{props.item.label}</span>

                    </div>
                )}
                <p className={`${props.isShow && hasSubItems ? "block" : "hidden"} me-4`}>
                    {showSubItems ? (
                        <BiChevronUp className={props.classes.arrow} />
                    ) : (
                        <BiChevronDown className={props.classes.arrow} />
                    )}
                </p>
            </div>
            <div className='flex gap-3 '>
                {props.item.link && (
                    <a href={props.item.link} className={`${props.isShow ? "block" : "hidden opacity-[0]"}`}>{props.item.label}</a>
                )}

            </div>

            {props.isShow && hasSubItems && showSubItems && <SubMenu items={props.item.children} isShow={props.isShow} classes={props.classes} />}
        </li>
    );
};

const SubMenu = (props) => {
    return (
        <ul className='pl-12 mt-3'>
            {props.items.map((item) => (
                <MenuItem key={item.id} item={item} isShow={props.isShow} classes={props.classes} />
            ))}
        </ul>
    );
};

const Menu = (props) => {
    return (
        <ul>
            {props.items.map((item) => (
                <MenuItem key={item.id} item={item} isShow={props.isShow} classes={props.classes} />
            ))}
        </ul>
    );
};

export default Menu;
import PropType from 'prop-types';
import { useState } from 'react';

const Header = ({onSearch}) =>{
    const [textSearch, setSearch]=useState()
    return(
        <div className="p-4 bg-black flex items-center justify-between">
            <div className="flex items-center space-x-7">
                <h1 className="text-[40px] uppercase font-bold text-red-600">Movie</h1>
                <nav className="text-[20px] flex items-center space-x-6 ">
                    <a href="#" className="text-white">Home</a>
                    <a href="#" className="text-white">About</a>
                    <a href="#" className="text-white">Contact</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <input type="text" placeholder="Search" className="p-2 text-black rounded" onChange={(e)=>setSearch(e.target.value)} value={textSearch}/>
                <button className="text-white bg-red-600 rounded p-2" onClick={()=>onSearch(textSearch)}>Search</button>
            </div>
        </div>
    )
}

Header.propTypes={
    onSearch:PropType.func,
};

export default Header;
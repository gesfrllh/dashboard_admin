import { useClose } from "../hooks/useClose";
import { HiArrowLeftCircle } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import {useCustomers} from "../hooks/useCustomer";

interface NavbarProps {
    toggleSideBar: () => void;
    props: string;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSideBar, props }) => {
    const [closeNow, toggle] = useClose(false);
    const [focusedSearch, setFocusedSearch] = useState<boolean>(false);
    const [dropdownSearch, setDropdownSearch] = useState<boolean>(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchInput, setSearchInput] = useState<string>("");

    const { data, loading, error } = useCustomers();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFocusedSearch(true);
        if (event.target.value !== "") {
            setSearchInput(event.target.value);
            setDropdownSearch(true);
        } else {
            setDropdownSearch(false);
        }
    };

    const searchData = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Home", link: "/" },
        { name: "Product", link: "/product" },
        { name: "Profile", link: "/profile" },
        { name: "Report", link: "/report" },
    ];

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setFocusedSearch(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleTogge = () => {
        toggleSideBar();
        toggle();
    };

    return (
        <div className={`py-4 flex items-center justify-between h-24 bg-gray-100 fixed ${closeNow ? "w-[94%]" : "w-[87%] transition-all ease-out delay-500"}`}>
            <div className="flex items-center">
                <div className="cursor-pointer px-4" onClick={handleTogge}>
                    <HiArrowLeftCircle size={28} className={`${closeNow ? "rotate-180 transition-all ease-in-out delay-500" : "ease-in-out transition-all delay-500"} `} color="#7EBFED" />
                </div>
                <div className="py-2">
                    <div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <div>
                                <p className="text-xl font-bold uppercase">Hello {data.name} 👋</p>
                                <p className="text-sm text-gray-500">Let's check your {props}!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="px-8 flex flex-col gap-1 relative">
                <div ref={searchRef} className={`py-2 px-4 flex items-center right-10 relative bg-white rounded-lg ${focusedSearch ? "border-2 border-blue-500" : "border-2 border-white"}`}>
                    <input
                        type="text"
                        className="outline-none text-sm"
                        placeholder="search"
                        onFocus={() => setFocusedSearch(true)}
                        onChange={handleSearch}
                    />
                    <CiSearch color="gray" />
                </div>
                {dropdownSearch && (
                    <div className="absolute right-[72px] w-[210px] bg-white top-12 rounded-lg">
                        {searchData
                            .filter(item => item.name.toLowerCase().startsWith(searchInput.toLowerCase()))
                            .map((item, id) => (
                                <div key={id}>
                                    <div className="py-1 hover:bg-blue-500 hover:text-white">
                                        <Link to={item.link} className="px-4 text-sm">
                                            {item.name}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;

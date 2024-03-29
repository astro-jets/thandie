"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
const SearchForm: React.FC = () => {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search/${searchQuery}`);
    };

    return (
        <div className="flex items-center gap-x-2 font-semibold text-gray-500 ">
            <input type="text" placeholder='Search' className='h-full border-gray-500 border-2 rounded-lg p-1 text-black'
                onChange={(e) => { setSearchQuery(e.target.value) }}
            />
            <button type="submit" onClick={handleSubmit}>
                <BsSearch size={15} color={'#fff'} className='text-gray-500' />
            </button>
        </div>
    );
}

export default SearchForm;
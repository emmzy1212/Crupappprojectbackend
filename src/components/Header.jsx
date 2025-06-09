import { useState, useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

function Header({ filter, setFilter }) {
  const [scrolled, setScrolled] = useState(false)
  const [debouncedFilter, setDebouncedFilter] = useState(filter)
  
  // Add scroll event listener to change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter(debouncedFilter)
    }, 300)

    return () => clearTimeout(timer)
  }, [debouncedFilter, setFilter])
  
  return (
    <header className={`sticky top-0 z-10 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-3' : 'bg-gradient-to-r from-primary-600 to-accent-600 py-4'
    }`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            scrolled ? 'text-primary-600' : 'text-white'
          }`}>
            CRUD App
          </h1>
          
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineSearch className={`${scrolled ? 'text-gray-500' : 'text-white'} h-5 w-5`} />
            </div>
            <input
              type="text"
              className={`w-full pl-10 pr-4 py-2 rounded-md focus:outline-none transition-all duration-300 ${
                scrolled 
                  ? 'bg-gray-100 border border-gray-200 focus:border-primary-500' 
                  : 'bg-white/20 text-white placeholder:text-white/75 focus:bg-white/30'
              }`}
              placeholder="Search by name, description, or category..."
              value={debouncedFilter}
              onChange={(e) => setDebouncedFilter(e.target.value)}
              aria-label="Search items"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
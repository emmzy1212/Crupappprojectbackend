import { useState, useEffect } from 'react'
import Header from './components/Header'
import ItemList from './components/ItemList'
import ItemForm from './components/ItemForm'
import api from './services/api' // Custom API service for handling HTTP requests
import { HiOutlinePlus } from 'react-icons/hi' // Plus icon from Heroicons via react-icons
import toast from 'react-hot-toast' // For showing notifications

function App() {
  // State to hold the list of items
  const [items, setItems] = useState([])

  // State to indicate if data is still loading
  const [loading, setLoading] = useState(true)

  // State to store any error messages
  const [error, setError] = useState(null)

  // Controls whether the item form is shown or hidden
  const [showForm, setShowForm] = useState(false)

  // Holds the item currently being edited (if any)
  const [currentItem, setCurrentItem] = useState(null)

  // Search filter string
  const [filter, setFilter] = useState('')

  // Function to fetch all items from the API
  const fetchItems = async () => {
    try {
      setLoading(true) // Start loading
      const response = await api.getItems() // Fetch items from API
      setItems(response.data) // Store items in state
      setError(null) // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch items') // Show error in UI, this is for the error state above,which we use for displaying error fetching items fetched error
      toast.error('Failed to fetch items') // Show toast notification
    } finally {
      setLoading(false) // Stop loading
    }
  }

  // useEffect to call fetchItems once when the component mounts
  useEffect(() => {
    fetchItems()
  }, [])

  // Create a new item by sending data to the API
  const handleCreateItem = async (itemData) => {
    try {
      const response = await api.createItem(itemData)
      setItems([response.data, ...items]) // Add new item to the top of the list
      setShowForm(false) // Hide the form after creation
      toast.success('Item created successfully!')
    } catch (err) {
      toast.error('Failed to create item')
    }
  }

  // Update an existing item
  const handleUpdateItem = async (id, itemData) => {
    try {
      const response = await api.updateItem(id, itemData)
      // Replace the old item with the updated one
      setItems(items.map(item => item._id === id ? response.data : item))
      setShowForm(false) // Hide the form
      setCurrentItem(null) // Clear currentItem
      toast.success('Item updated successfully!')
    } catch (err) {
      toast.error('Failed to update item')
    }
  }

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      await api.deleteItem(id)
      // Remove the item from state
      setItems(items.filter(item => item._id !== id))
      toast.success('Item deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete item')
    }
  }

  // Start editing an item
  const handleEditItem = (item) => {
    setCurrentItem(item) // Set the selected item to edit
    setShowForm(true) // Show the form
  }

  // Filter items based on the search term (case-insensitive)
  const filteredItems = items.filter(item => {
    const searchTerm = filter.toLowerCase()
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search filter input */}
      <Header 
        filter={filter} 
        setFilter={setFilter} 
      />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Items</h2>
            {/* Show message if filter is active */}
            {filter && (
              <p className="text-sm text-gray-600 mt-1">
                Showing results for "{filter}"
              </p>
            )}
          </div>

          {/* Button to add a new item */}
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={() => {
              setCurrentItem(null) // Reset any item being edited
              setShowForm(true) // Show the form
            }}
          >
            <HiOutlinePlus className="text-lg" />
            Add New Item
          </button>
        </div>
        
        {/* Error message block */}
        {/* // If there's an error (i.e., the 'error' variable is truthy), render this block */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 animate-fade-in">
            {error}
            {/* Display the actual error message */}
          </div>
        )}
        
        {/* Show the form if adding or editing */}
        {showForm && (
          <div className="mb-8 animate-slide-up">
            <ItemForm 
              currentItem={currentItem} 
              onSubmit={currentItem ? handleUpdateItem : handleCreateItem}
              onCancel={() => {
                setShowForm(false) // Hide form on cancel
                setCurrentItem(null) // Clear current item
              }}
            />
          </div>
        )}
        
        {/* Render list of items */}
        {/* This is the component holding the itemlist of the item we have in the app */}
       <ItemList 
     // Pass the filtered list of items to the ItemList component as a prop called "items"
     items={filteredItems} 
  
      // Pass the loading state (usually a boolean) to indicate whether data is still being fetched
      loading={loading} 
  
     // Pass a function to handle when an item is being edited
     onEdit={handleEditItem}
  
      // Pass a function to handle when an item is deleted
    onDelete={handleDeleteItem}
    />
      </main>
    </div>
  )
}

export default App

// Importing required icons from react-icons and a custom loading spinner component
import { HiOutlinePencil, HiOutlineTrash, HiOutlineTag } from 'react-icons/hi'
import LoadingSpinner from './LoadingSpinner'

// ItemList component receives props: items (array), loading (boolean), onEdit (function), onDelete (function)
function ItemList({ items, loading, onEdit, onDelete }) {

  // If loading is true, show the loading spinner centered vertically and horizontally
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  // If there are no items in the list, show a placeholder "No items found" message
  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in">
        <HiOutlineTag className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
        <p className="mt-1 text-gray-500">Get started by creating a new item.</p>
      </div>
    )
  }

  // If items are available, render them in a responsive grid layout
  // This is a card
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {items.map((item) => (
        // Each item is rendered inside a card component, using item._id as the key
        <div 
          key={item._id} 
          className="card group hover:shadow-lg transition-all duration-200"
        >
          {/* If item has an imageUrl, show the image */}
          {item.imageUrl ? (
            <div className="h-48 overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          ) : (
            // If no image, show a gray icon placeholder
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <HiOutlineTag className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {/* Content section of the card */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                {/* Item name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                {/* Item category displayed as a badge */}
                <span className="badge bg-secondary-100 text-secondary-800 mb-2">
                  {item.category}
                </span>
              </div>
              {/* Item price */}
              <span className="text-lg font-bold text-primary-600">
                ${item.price.toFixed(2)} {/* Ensures 2 decimal places */}
              </span>
            </div>
            
            {/* Description with text clamped to 2 lines */}
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.description}</p>
            
            {/* Footer of the card with stock status and edit/delete buttons */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              {/* Conditional class for in-stock or out-of-stock badge */}
              <span className={`badge ${item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              
              {/* Action buttons: Edit and Delete */}
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(item)} // Calls parent function with full item
                  className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
                >
                  <HiOutlinePencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(item._id)} // Calls parent function with only the item's ID
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <HiOutlineTrash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemList

import Link from "next/link";

const TravelCard = ({ destination, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full ${className}`}>
      <div className="relative h-48 w-full">
        <img
          src={destination.images[0]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
          {destination.type}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{destination.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{destination.city}, {destination.state}</p>
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-600 ml-1">{destination.rating}</span>
          </div>
          <div className="text-sm font-bold text-gray-600">₦{destination.price}</div>
        </div>
        <div className="mb-4 flex-grow">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Activities:</h4>
          <div className="flex flex-wrap gap-2">
            {destination.activities.slice(0, 3).map((activity, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {activity}
              </span>
            ))}
            {destination.activities.length > 3 && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{destination.activities.length - 3} more
              </span>
            )}
          </div>
        </div>
        <button asChild className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300 mt-auto">
            <Link href={`/destinations/${destination.id}`}>View details</Link>
        </button>
      </div>
    </div>
  );
};

export default TravelCard;

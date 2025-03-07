export const Coffee = () => {
    return (
      <div className="my-4 p-4 bg-gray-900 rounded flex items-center">
        <div className="coffee-cup mr-4 relative">
          <div className="w-8 h-8 bg-brown-300 rounded-b-lg overflow-hidden">
            <div className="coffee-liquid"></div>
          </div>
          <div className="w-2 h-4 bg-brown-300 absolute right-0 top-0 transform translate-x-full rounded-r-lg"></div>
        </div>
        <div>Brewing your coffee... <span className="animate-pulse">☕</span></div>
      </div>
    );
  };
const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 rounded-lg h-64 mb-4"></div>
      <div className="bg-gray-300 rounded h-6 w-3/4 mb-2"></div>
      <div className="bg-gray-300 rounded h-4 w-1/2"></div>
    </div>
  );
};

export default SkeletonLoader;


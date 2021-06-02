import { ArrowCircleRightIcon } from "@heroicons/react/outline";

const Messages = () => {
  return (
    <div className="p-8">
      <h1 className="text-center text-blue-700 font-medium text-2xl">
        Messages
      </h1>
      <div className="max-w-4xl md:h-64 h-52 border-2 border-gray-200 flex flex-col-reverse mx-auto bg-gray-100 rounded-lg mt-6">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Enter message"
            className="w-full px-4 py-1 outline-none"
          />
          <button className="overflow-visible flex bg-blue-700 text-gray-100 px-4 py-2 rounded-md items-center space-x-1 cursor-pointer hover:bg-blue-800">
            <span className="uppercase font-medium">send</span>
            <ArrowCircleRightIcon className="w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;

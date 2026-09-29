import { RiLoaderLine } from "react-icons/ri";

const DataLoadingScreen = () => {
  return (
    <div className="w-full py-50 px-10 flex items-center justify-center gap-3 bg-(--bg-light-primary)">
      <RiLoaderLine className="text-3xl text-(--primary) animate-spin" />
      <p className="text-(--primary) text-xl">Loading</p>
    </div>
  );
};

export default DataLoadingScreen;

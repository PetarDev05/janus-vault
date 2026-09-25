const SecretFields = ({ field }) => {
  return (
    <div className="w-full flex flex-row items-center gap-3">
      <div
        type="text"
        className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none py-1.5 px-4 min-w-0 text-sm overflow-scroll"
      >
        {field.key}
      </div>
      <div
        type="text"
        className="flex-1 rounded-md border border-(--border-light) text-(--text-light) outline-none py-1.5 px-4 min-w-0 text-sm overflow-scroll"
      >
        {field.value}
      </div>
    </div>
  );
};

export default SecretFields;

const LogoOut = () => {
  return (
    <div className="text-(--primary) flex flex-col items-center gap-2">
      <img src="/janus-vault-logo.png" alt="logo" className="h-15" />
      <div className="flex flex-col items-center">
        <p className="text-3xl text-(--heading-light) dark:text-(--heading-dark) font-semibold">
          Janus
        </p>
        <p className="text-md text-(--primary) font-semibold">VAULT</p>
      </div>
    </div>
  );
};

export default LogoOut;

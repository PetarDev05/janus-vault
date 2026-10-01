const Logo = () => {
  return (
    <div className="text-(--primary) text-2xl flex flex-row items-center gap-2">
      <img src="/janus-vault-logo.png" alt="logo" className="h-12" />
      <div className="flex flex-row items-baseline gap-1">
        <p className="text-2xl text-(--heading-light) dark:text-(--heading-dark) font-semibold">
          Janus
        </p>
        <p className="text-sm text-(--primary) font-semibold">VAULT</p>
      </div>
    </div>
  );
};

export default Logo;

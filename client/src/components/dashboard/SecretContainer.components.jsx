import { useDataContext } from "../../hooks/context_hooks/useDataContext.hooks.jsx";
import SecretCard from "./units/SecretCard.components.jsx";

const SecretContainer = () => {
  const { secrets } = useDataContext();

  return (
    <div className="w-full flex flex-col items-start gap-7">
      <h2 className="w-full text-lg min-[500px]:text-xl text-(--primary) pl-2">
        Secrets
      </h2>
      <div className="w-full max-w-310 grid grid-cols-3 gap-5">
        {secrets.map((secret, i) => (
          <SecretCard key={`${i}-${secret._id}`} secret={secret} />
        ))}
      </div>
    </div>
  );
};

export default SecretContainer;

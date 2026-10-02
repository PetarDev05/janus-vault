import { useAuthContext } from "../../../hooks/context_hooks/useAuthContext.hooks.jsx";

const ProfileWindow = () => {
  const { user } = useAuthContext();

  return (
    <div className="absolute max-[500px]:-right-1 min-[500px]:-left-1 max-[500px]:-bottom-1 min-[500px]:top-21.25 rounded-lg border border-(--border-light) dark:border-(--border-dark) bg-(--card-light) dark:bg-(--card-dark) backdrop-blur-xl z-15 flex flex-col items-start gap-5 p-5 max-[500px]:pb-22 min-[500px]:pl-22 text-nowrap">
      <p className="text-(--text-dark) ">
        Username: <span className="text-(--primary)/70">{user.username}</span>
      </p>
      <p className="text-(--text-dark) ">
        E-mail: <span className="text-(--primary)/70">{user.email}</span>
      </p>
      <p className="text-(--text-dark) ">
        Member since:{" "}
        <span className="text-(--primary)/70">
          {user.createdAt.split("T")[0]}
        </span>
      </p>
    </div>
  );
};

export default ProfileWindow;

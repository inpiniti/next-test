export const ComponentName = ({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  return (
    <div
      className={`group pointer-events-none absolute left-0 top-0 z-99999 h-full
        w-full hover:border hover:border-solid hover:border-red-500`}
    >
      <div
        className={`pointer-events-auto h-fit w-fit cursor-pointer text-xs text-red-500 text-opacity-25
        hover:bg-white hover:text-opacity-100 absolute ${className}`}
      >
        {name}
      </div>
    </div>
  );
};

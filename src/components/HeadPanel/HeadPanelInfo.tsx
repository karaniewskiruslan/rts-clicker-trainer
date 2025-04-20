type Props = {
  title: string;
  info: number;
};

const HeadPanelInfo = ({ title, info }: Props) => {
  return (
    <article className="flex flex-col justify-center gap-1 text-center">
      <p className="text-sm">{title}</p>
      <p className="animate-number text-3xl" key={info}>
        {info}
      </p>
    </article>
  );
};

export default HeadPanelInfo;

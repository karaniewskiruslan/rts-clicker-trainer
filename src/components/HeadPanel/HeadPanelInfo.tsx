type Props = {
  title: string;
  info: number;
};

const HeadPanelInfo = ({ title, info }: Props) => {
  return (
    <article className="flex flex-col justify-center gap-1 text-center">
      <p className="text-sm">{title}</p>
      <p className="text-3xl">{info}</p>
    </article>
  );
};

export default HeadPanelInfo;

type Props = {
  title: string;
  score: number;
};

const HeadPanelScore = ({ title, score }: Props) => {
  return (
    <article className="flex w-20 flex-col justify-center gap-1 text-center">
      <p className="text-sm">{title}</p>
      <p className="animate-number text-3xl" key={score}>
        {score}
      </p>
    </article>
  );
};

export default HeadPanelScore;

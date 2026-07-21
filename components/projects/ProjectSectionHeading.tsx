interface Props {
  word: string;
  bracketWord: string;
}

export default function ProjectSectionHeading(props: Props) {
  const { word, bracketWord } = props;
  return (
    <h3 className="w-full text-muted tracking-wider project-section-heading relative">
      {word} <span className="text-accent-neon">({bracketWord})</span>
    </h3>
  );
}

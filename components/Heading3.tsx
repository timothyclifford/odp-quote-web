type Props = {
  text: string;
};

export const Heading3 = ({ text }: Props) => {
  return <h3 className="text-xl">{text}</h3>;
};

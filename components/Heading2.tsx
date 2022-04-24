type Props = {
  text: string;
};

export const Heading2 = ({ text }: Props) => {
  return <h2 className="text-2xl mb-4">{text}</h2>;
};

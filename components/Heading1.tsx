type Props = {
  text: string;
};

export const Heading1 = ({ text }: Props) => {
  return <h1 className="text-3xl mb-4">{text}</h1>;
};

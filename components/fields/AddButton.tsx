import { useState } from "react";
import { Heading2 } from "../Heading2";

type Props = {
  label: string;
  options: Array<string>;
  onClick: (name: string) => void;
};

export const AddButton = ({ label, options, onClick }: Props) => {
  const [modal, setModal] = useState(false);
  const select = (selected: string) => {
    onClick(selected);
    setModal(false);
  };
  return (
    <>
      <button className="btn btn-add" onClick={() => setModal(true)}>
        {label}
      </button>
      <div
        className={`absolute w-full h-full top-0 left-0 bg-pink ${
          modal ? "" : "hidden"
        }`}
      >
        <div className="h-full grid grid-cols-1 place-content-center text-center">
          <div className="py-3 my-3 font-bold text-xl uppercase">{label}</div>
          {options.map((n) => {
            return (
              <div
                key={n}
                className="w-72 py-3 my-3 mx-auto bg-white border border-pink-100 rounded cursor-pointer"
                onClick={() => {
                  select(n);
                }}
              >
                {n}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-5 right-8 px-4 py-2 bg-red-400 text-white text-xl rounded-3xl cursor-pointer"
          onClick={() => setModal(false)}
        >
          ✖
        </div>
      </div>
    </>
  );
};

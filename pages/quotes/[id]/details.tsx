import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AreaField } from "../../../components/AreaField";
import { ExtraField } from "../../../components/ExtraField";
import { Area, createArea } from "../../../domain/area/area";
import { createExtra, Extra } from "../../../domain/extra/extra";
import { Quote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";

type Props = {
  quote: Quote;
};

const Details: NextPage<Props> = ({ quote }) => {
  const router = useRouter();
  const [areas, setAreas] = useState<Array<Area>>([]);
  const [extras, setExtras] = useState<Array<Extra>>([]);

  const save = () => {
    // TODO
  };

  // Area
  const addArea = () => {
    setAreas([...areas, createArea()]);
  };
  const saveArea = (area: Area, idx: number) => {
    const updated = [...areas];
    updated[idx] = area;
    setAreas(updated);
  };
  const deleteArea = (area: Area) => {
    const updated = areas.filter((a) => a !== area);
    setAreas(updated);
  };

  // Extra
  const addExtra = () => {
    setExtras([...extras, createExtra()]);
  };
  const saveExtra = (extra: Extra, idx: number) => {
    const updated = [...extras];
    updated[idx] = extra;
    setExtras(updated);
  };
  const deleteExtra = (extra: Extra) => {
    const updated = extras.filter((e) => e !== extra);
    setExtras(updated);
  };

  return (
    <div>
      <Head>
        <title>{`Quote ${quote.id}`}</title>
      </Head>
      <main>
        <h1>{`Quote ${quote.id}`}</h1>
        <div>
          <button onClick={() => router.push("/")}>Home</button>
        </div>
        <h2>Areas</h2>
        {areas.map((area, idx) => {
          return (
            <div>
              <AreaField
                area={area}
                onSave={(a) => saveArea(a, idx)}
              ></AreaField>
              <div>
                <button onClick={() => deleteArea(area)}>Delete area</button>
              </div>
            </div>
          );
        })}
        <div>
          <button onClick={() => addArea()}>Add area</button>
        </div>
        <h2>Extras</h2>
        {extras.map((extra, idx) => {
          return (
            <div>
              <ExtraField
                extra={extra}
                onSave={(e) => saveExtra(e, idx)}
              ></ExtraField>
              <div>
                <button onClick={() => deleteExtra(extra)}>Delete extra</button>
              </div>
            </div>
          );
        })}
        <div>
          <button onClick={() => addExtra()}>Add extra</button>
        </div>
        <div>
          <button onClick={() => save()}>Save</button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params!.id as string;
  const service = QuoteService();
  const quote = service.getById(id);
  return {
    props: {
      quote: {
        id: "1234",
        firstName: "Bob",
        lastName: "Bobson",
        email: "bob@bobson.com",
        phone: "0400000000",
        street: "123 Bob St",
        suburb: "Bobville",
        postcode: "3210",
      },
    },
  };
};

export default Details;

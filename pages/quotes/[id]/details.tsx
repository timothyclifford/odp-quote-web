import { customAlphabet } from "nanoid";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Area } from "../../../domain/area/area";
import { Item } from "../../../domain/item/item";
import { Quote } from "../../../domain/quote/quote";
import { QuoteService } from "../../../domain/quote/quoteService";

type Props = {
  quote: Quote;
};

const Details: NextPage<Props> = ({ quote }) => {
  const router = useRouter();
  const [areas, setAreas] = useState<Array<Area>>([]);
  const [items, setItems] = useState<Array<Item>>([]);
  const save = () => {};
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
        {areas.map((area) => {
          return (
            <div>
              <div>${area.name}</div>
              <div>
                $
                <input type="text" value={area.price} />
              </div>
              <div>
                Ceilings
                <input type="checkbox" />
              </div>
              <div>
                Skirting
                <input type="checkbox" />
              </div>
              <div>
                {area.items.map((areaItem) => {
                  return (
                    <div>
                      <div>{areaItem.name}</div>
                      <div>
                        $
                        <input type="text" value={areaItem.price} />
                      </div>
                      <div>
                        <div>
                          <button>-</button>
                        </div>
                        <div>{areaItem.quantity}</div>
                        <div>
                          <button>+</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <input
                  type="text"
                  value={area.comment}
                  defaultValue="Comments..."
                />
              </div>
            </div>
          );
        })}
        <button>Add area</button>
        <h2>Items</h2>
        {items.map((item) => {
          return <div></div>;
        })}
        <button>Add item</button>
        <button onClick={() => save()}>Save</button>
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
      quote,
    },
  };
};

export default Details;

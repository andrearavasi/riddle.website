
import { api, HydrateClient } from "~/trpc/server";
import { VolumesList } from "./_components/volume";

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <div className="flex  flex-col gap-10">
          <div className="flex flex-col place-self-center items-center">
            <div className="pb-5">
              <h1 className="mb-8 text-5xl tracking-tighter">RIDDLE</h1>
            </div>
            <div className="">
              <h2>volumi</h2>
            </div>
          </div>
        </div>
        <div className="my-8">
          <VolumesList />
        </div>
      </main>
    </HydrateClient>
  );
}

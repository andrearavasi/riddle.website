import { GuessTitle1 } from '~/app/_components/guessTitle copy';
import { api } from '~/trpc/server';

export default async function Page() {

    const poemsList = await api.poem.getAll();

    return (
        <main>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col place-self-center items-center">
                    <div className="pb-5">
                        <h1 className="mb-8 text-5xl tracking-tighter">VOL.1</h1>
                    </div>
                    <div className="">
                        <h2>Indovina i titoli</h2>
                    </div>
                </div>
                <div className="w-full max-w-xs">
                    {poemsList.map((poem) =>
                        <GuessTitle1 poem={poem} ></GuessTitle1>
                    )}
                </div >
            </div>
        </main>
    );
}
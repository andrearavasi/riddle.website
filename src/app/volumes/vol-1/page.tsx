import { neon } from '@neondatabase/serverless';
import { api } from '~/trpc/server';

export default async function Page() {
    async function create(formData: FormData) {
        'use server';
        // Connect to the Neon database
        const sql = neon(`${process.env.DATABASE_URL}`);

        const comment = formData.get('comment');
        // Insert the comment from the form into the Postgres database
        await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
    }

    const poemsList = await api.poem.getAll();

    return (
        <main>
            <div className="flex  flex-col gap-10">
                <div className="flex flex-col place-self-center items-center">
                    <div className="pb-5">
                        <h1 className="mb-8 text-5xl tracking-tighter">VOL.1</h1>
                    </div>
                    <div className="">
                        <h2>Indovina i titoli</h2>
                    </div>
                </div>
                <form action={create} className='flex flex-col gap-5'>
                    {poemsList.map((poem) => (
                        <div key={poem.id} className='flex gap-3 items-center'>
                            <span className='min-w-5'>{poem.name}</span>
                            <input type="text" className='rounded p-1 text-black' placeholder="titolo" name="guess" />
                        </div>
                    ))}
                </form>
            </div>
        </main>
    );
}
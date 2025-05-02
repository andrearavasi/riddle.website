import { GuessTitle } from '~/app/_components/guessTitle';
import { api } from '~/trpc/server';
import { SignIn } from '../_components/auth/sign-in';

export default async function Page() {

    return (
        <main className='flex flex-col gap-10 '>
            <div className="flex gap-10 self-center">
                <h5>Registrati per scoprire la tua posizione in classifica</h5>
            </div>
            <div className="flex gap-10">
                <SignIn />
            </div>
        </main>
    );
}
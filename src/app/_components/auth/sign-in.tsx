import { signIn } from "auth"

export function SignIn() {
    return (
        <form
            className="flex flex-col w-full gap-2 p-2 items-center"
            action={async (formData) => {
                "use server"
                await signIn("credentials", formData)
            }}
        >
            <div className="flex w-full">
                <label className="rounded-full px-4 py-2 w-1/4">nickname</label>
                <input className="w-full rounded-full px-4 py-2 text-black" name="name" type="text" />
            </div>
            <div className="flex w-full">
                <label className="rounded-full px-4 py-2 w-1/4">email</label>
                <input className="w-full rounded-full px-4 py-2 text-black" name="email" type="email" />
            </div>
            <div className="flex w-full">
                <label className="rounded-full px-4 py-2 w-1/4">password</label>
                <input className="w-full rounded-full px-4 py-2 text-black" name="password" type="password" />
            </div>
            <div className="flex self-center pt-5">
                <button
                    className="rounded-full bg-white/10 px-3 py-2 font-semibold transition hover:bg-white/20">
                    registrati
                </button>
            </div>
        </form>
    )
}
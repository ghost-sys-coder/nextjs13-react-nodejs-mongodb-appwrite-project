export default function userProfile({ params }: any) {
    const { id } = params;

    return (
        <main>
            <h1>Profile</h1>
            <hr className="bg-white w-[100%] h-1" />
            <p className="text-white">Profile Page: <span className="text-4xl p-4 bg-orange-600 text-white">{id}</span></p>
        </main>
    )
}
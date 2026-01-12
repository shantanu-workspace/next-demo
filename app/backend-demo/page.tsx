export default async function BackendDemo() {
    const res = await fetch("http://localhost:3000/api/hello", {
        cache: "no-store", 
    });

    const data = await res.json();

    return (
        <div>
            <h3>This is already loaded in the server</h3>
            <h1>Backend - Frontend Integration</h1>

            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );

}
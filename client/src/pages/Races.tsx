export default function Races() {

    fetch('http://127.0.0.1:8080/api/get')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });

    return (
        <>
            <h1>Races</h1>
        </>
    )
}

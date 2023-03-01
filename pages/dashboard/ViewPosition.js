
export async function getServerSideProps() {
    return {
        props: {
            dashboard: true
        }
    }
}

function ViewPosition() {
    return (
        <></>
    );
}

export default ViewPosition;
import Dashboard from "../../components/dashboard/Dashboard";

function ViewPosition() {
    return (
        <></>
    );
}

ViewPosition.getLayout = function getLayout(page) {
    return (
        <Dashboard>{page}</Dashboard>
    )
}

export default ViewPosition;
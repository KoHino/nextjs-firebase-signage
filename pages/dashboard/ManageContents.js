import dynamic from "next/dynamic";

const ContentsView = dynamic(() => import("../../components/dashboard/ManageContentsList"), { ssr: false });

export async function getServerSideProps() {
  return {
    props: {
      dashboard: true,
    }
  };
}

function ManageContents() {


  return (
    <>
      <ContentsView />
    </>
  );
}

export default ManageContents;
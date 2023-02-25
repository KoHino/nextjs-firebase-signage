import Dashboard from "../../components/dashboard/Dashboard";
import dynamic from "next/dynamic";

const Upload = dynamic(() => import("../../components/dashboard/UplaodContents"), { ssr: false})

export async function getServerSideProps() { 
  //userId ⇒ areaId ⇒　Contents/(DocId) ⇒ orderId取得
  const orderId = "dH0bsMmsi3QSJy9T90l1";

  return {
    props: {
      orderId
    }
  };
}

function index({orderId}) {
    return (
        <Upload orderId={orderId} />
    );
}

index.getLayout = function getLayout(page) {
    return (
        <Dashboard>{page}</Dashboard>
    )
}

export default index;
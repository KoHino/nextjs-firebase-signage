import dynamic from "next/dynamic";

const Upload = dynamic(() => import("../../components/dashboard/UplaodContents"), { ssr: false })

export async function getStaticProps() {

  return {
    props: {
      dashboard: true
    }
  };
}

function UploadContent() {

  return (
    <Upload />
  );
}

export default UploadContent;
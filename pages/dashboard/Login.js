import { useRouter } from "next/router";
import { useEffect } from "react";
import { getContentDataClient } from "../../utilities/getContentDataClient";

export async function getStaticProps() {
    const docIds = ["i03QwRfyfmniocAe1OEQ", "gMh6kTTHwArqu7rqgACd"];
    let contentsInfo = [];
    await Promise.all(docIds.map(async (id) => {
        const info = await getContentDataClient(`contents/${id}`);
        contentsInfo.push(info);
    }))
  
    return {
        props: {
            contents: contentsInfo
        }
    }
}

function Login({contents: contentsInfo}) {
    const router = useRouter();

    useEffect(() => {
        sessionStorage.setItem('contents', JSON.stringify(contentsInfo, undefined, 1));
        router.replace('/dashboard');
    },[contentsInfo, router])

    return (
        <>
            ログイン中です
        </>
    );
}

export default Login;
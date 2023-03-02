import { useRouter } from "next/router";
import { useEffect } from "react";
import { getContentDataClient } from "../../utilities/getContentDataClient";

function Login() {
    const router = useRouter();

    useEffect(() => {
        async function featchData() {
            const docIds = ["i03QwRfyfmniocAe1OEQ", "gMh6kTTHwArqu7rqgACd"];
            let contentsInfo = [];
            await Promise.all(docIds.map(async (id) => {
                const info = await getContentDataClient(`contents/${id}`);
                contentsInfo.push(info);
            }))
            sessionStorage.setItem('contents', JSON.stringify(contentsInfo, undefined, 1));
            console.log("Login: ", sessionStorage.getItem('contents'));
            router.replace('/dashboard');
        }
        featchData();
    }, [router])

    return (
        <>
            ログイン中です
        </>
    );
}

export default Login
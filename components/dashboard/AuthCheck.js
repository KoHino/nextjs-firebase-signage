import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function AuthCheck({ children }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            setLoading(true);
        }
    }, [router.isReady])

    //router.isReady == trueまで待たないとエラーになる
    if (!loading) return <h2>router準備中</h2>
    
    if( sessionStorage.getItem('contents') == null ) {
        router.replace("/dashboard/Login");
    }
    return children;
}

export default AuthCheck;
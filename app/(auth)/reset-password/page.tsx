// export default function ResetPasswordPage() {
//     return (
//         <div>
//             Reset Password Page
//         </div>
//     );
// }

import ResetPasswordForm from "../_components/ResetPasswordForm";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const token = query.token as string | undefined;
    if(!token){
        throw new Error('Invalid or missing token');
    }

    return (
        <div>
            <ResetPasswordForm token={token} />
        </div>
    );
}
import { onBoardUser } from "@/features/auth/actions";


export default async function RootGroupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await onBoardUser();

    return children
}
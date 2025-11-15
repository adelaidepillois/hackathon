import type { Metadata } from "next";
import { Geist } from "next/font/google";
// import { ThemeProvider } from "next-themes";
import "./globals.css";
import UserBadge from "@/components/game/UserBadge";
import ScoreBadge from "@/components/game/ScoreBadge";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
	variable: "--font-geist-sans",
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.className} antialiased bgPage`}>
				<UserBadge label={'adepil'} position="left" />
				<ScoreBadge score={0} />

				{/* <ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				> */}
				{children}
				{/* </ThemeProvider> */}
			</body>
		</html>
	);
}

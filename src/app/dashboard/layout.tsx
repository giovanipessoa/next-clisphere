"use client";

import { SuperhumanLayout } from "@/components/layout/superhuman-layout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SuperhumanLayout>{children}</SuperhumanLayout>;
}

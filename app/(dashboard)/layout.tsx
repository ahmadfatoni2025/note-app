import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardContent from "@/app/(dashboard)/DashboardContent";

interface User {
  id: string;
  email: string;
}

export default async function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user data from Prisma
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      workspaces: true,
      notes: {
        orderBy: { updated_at: 'desc' },
        take: 5
      }
    }
  });

  const castUser: User = {
    id: user.id,
    email: user.email || ""
  };

  return (
    <DashboardContent dbUser={dbUser} user={castUser}>
      {children}
    </DashboardContent>
  );
}

import { redirect } from "next/navigation";
import { isAuthenticated, logoutAdmin } from "@/lib/auth";
import { getAnalytics } from "@/lib/analytics";
import { Users, MessageCircle, ExternalLink, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const isAuth = await isAuthenticated();
  
  if (!isAuth) {
    redirect("/admin-analytics/login");
  }

  const data = await getAnalytics();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-black" />
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          </div>
          
          <form action={logoutAdmin}>
            <Button variant="outline" type="submit">
              Log out
            </Button>
          </form>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Site Visits</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{data.visits}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">WhatsApp Clicks</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{data.whatsapp_clicks}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <ExternalLink className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Messenger Clicks</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{data.messenger_clicks}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

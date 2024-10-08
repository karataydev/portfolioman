import { LoginResponse } from "../googleAuthData";
import { Home, Search, User } from "lucide-react";
import GeneralHeader from "../GeneralHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomePage from "../homePage/HomePage";
import { useMediaQuery } from "@react-hook/media-query";

export default function MainPage({
  loginDetails,
  logoutAction,
}: {
  loginDetails: LoginResponse;
  logoutAction: () => void;
}) {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  return (
    <Tabs defaultValue="home" className="flex flex-col min-h-screen">
      <GeneralHeader className="flex justify-between items-center">
        {isLargeScreen && (
          <TabsList className="bg-transparent text-lg">
            <TabsTrigger
              value="explore"
              className="text-foreground px-4 py-2 flex items-center"
            >
              <Search size={16} className="mr-2" />
              Explore
            </TabsTrigger>
            <TabsTrigger
              value="home"
              className="text-foreground px-4 py-2 flex items-center"
            >
              <Home size={16} className="mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="text-foreground px-4 py-2 flex items-center"
            >
              <User size={16} className="mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>
        )}
      </GeneralHeader>

      <div className="flex-grow bg-background text-foreground container mx-auto md:max-w-6xl">
        <TabsContent value="home">
          <HomePage loginDetails={loginDetails} logoutAction={logoutAction} />
        </TabsContent>

        <TabsContent value="explore">
          <main className="flex-grow p-4 space-y-6 pb-16">
            <h1 className="text-2xl font-bold">Explore</h1>
            <p>Discover new portfolios and assets here.</p>
          </main>
        </TabsContent>

        <TabsContent value="profile">
          <main className="flex-grow p-4 space-y-6 pb-16">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p>Welcome, {loginDetails.user.first_name}!</p>
            <button
              onClick={logoutAction}
              className="bg-primary text-foreground px-3 py-1 rounded-md"
            >
              Logout
            </button>
          </main>
        </TabsContent>
      </div>

      {!isLargeScreen && (
        <TabsList className="grid w-full grid-cols-3 bg-secondarybackground pb-12 fixed bottom-0 left-0 right-0">
          <TabsTrigger value="explore" className="flex flex-col items-center">
            <Search size={20} />
            <span className="text-xs">Explore</span>
          </TabsTrigger>
          <TabsTrigger value="home" className="flex flex-col items-center">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex flex-col items-center">
            <User size={20} />
            <span className="text-xs">Profile</span>
          </TabsTrigger>
        </TabsList>
      )}
    </Tabs>
  );
}

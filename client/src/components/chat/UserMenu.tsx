import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Settings, User } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "@/hooks/auth/useLogout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import { useGetProfile } from "@/hooks/auth/useGetProfile";
import { useUpdateProfile } from "@/hooks/auth/useUpdateProfile";

function UserMenu() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<Blob | string>("");

  const { mutate: logout, isPending } = useLogout();
  const { mutate: updateProfile, isPending: isProfileUpdating } =
    useUpdateProfile();
  const { data, isLoading } = useGetProfile();

  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: async () => {
        await queryClient.invalidateQueries();
      },
      onError: (error) => {
        console.log(error.response?.data.message || "Failed to logout");
      },
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleProfileUpdate = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    if (imageFile instanceof Blob) {
      formData.append("profilePhoto", imageFile);
    }

    updateProfile(formData, {
      onSuccess: async (data) => {
        console.log(data);
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
        setIsProfileOpen(false);
        setImageFile("");
      },
      onError: (error) => {
        console.log(error.response?.data.message || "Update profile failed");
      },
    });
  };

  useEffect(() => {
    if (data?.user) {
      setUsername(data?.user.username);
      setImagePreview(data.user.profilePhoto || "");
    }
  }, [data]);

  return (
    <div className="p-3">
      <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {isLoading ? (
              "..."
            ) : (
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={data?.user.profilePhoto}
                  alt={data?.user.username}
                />
                <AvatarFallback>
                  {data?.user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="flex flex-col gap-2 p-2">
            <DropdownMenuItem
              onClick={() => setIsProfileOpen(true)}
              className="w-full justify-start  gap-2 font-medium"
            >
              <User className="h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuGroup>
              <DropdownMenuItem
                disabled={isPending}
                onClick={handleLogout}
                className="w-full justify-start gap-2 font-medium"
              >
                <LogOut className="h-4 w-4" />
                {isPending ? "Logging out" : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-sm font-medium">{data?.user.username}</p>
          <p className="truncate text-xs text-muted-foreground">Free plan</p>
        </div>

        {/* profile dialog */}
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Update your profile information.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-5 py-4">
              {/* Profile Photo */}
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={data?.user.profilePhoto || imagePreview}
                    alt={data?.user.username}
                  />
                  <AvatarFallback className="text-2xl">
                    {data?.user.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                >
                  <label htmlFor="image">Change</label>
                </Button>
                <input
                  onChange={handleFileChange}
                  type="file"
                  hidden
                  id="image"
                />
              </div>
            </div>

            {/* User Info */}
            <form onSubmit={handleProfileUpdate}>
              <div className="w-full space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Username</label>

                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email</label>

                  <input
                    type="email"
                    defaultValue={data?.user.email}
                    readOnly
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none "
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Cancel
                </Button>

                <Button disabled={isProfileUpdating} type="submit">
                  {isProfileUpdating ? "saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default UserMenu;

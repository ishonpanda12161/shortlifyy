import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link2Icon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import { logout } from "@/db/apiAuth";
import { BarLoader, FadeLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

const Header = () => {

    const {loading, fn:fnLogout} = useFetch(logout);
    const navigate = useNavigate();
    const {user, fetchUser} = UrlState();


  return (
        <div>
        <nav className="py-3">
        <div className=" flex justify-between items-center px-15">
            <Link to="/">
            <img src="/logo.png" className="h-16" alt="Shortlify" />
            </Link>
            <div>
                {!user ?
                    <Button onClick={() => navigate("/auth")}>Login</Button>
                    : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                                    <Avatar>
                                    <AvatarImage src={user?.user_metadata?.profilepic} />
                                    <AvatarFallback>IP</AvatarFallback>
                                    </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to={"/dashboard"} className="flex">
                                    <Link2Icon className="mr-2 h-4 w-4"/> My Links
                                    </Link>
                                     </DropdownMenuItem>
                                <DropdownMenuItem
                                        onClick={() => {
                                            fnLogout().then(() => {
                                            fetchUser();
                                            navigate("/auth");
                                            });
                                        }}
                                        className="text-red-400"
                                        >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                        </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                    )
                }
            </div>
        </div>
        </nav>
        {loading && <FadeLoader className="mb-4" height={20} width={8} color={"#111111"} />}
        </div>
  )
}
export default Header;
import Toaster from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import Login from "@/pages/Login";

export default function LoginLayout() {
    return (
        <AuthProvider>
            <Login/>
            <Toaster/>
        </AuthProvider>
    );
}
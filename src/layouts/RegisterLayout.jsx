import Toaster from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import Register from "@/pages/Register";

export default function RegisterLayout() {
    return (
        <AuthProvider>
            <Register/>
            <Toaster/>
        </AuthProvider>
    );
}
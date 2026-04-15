import {useEffect} from "react";
import {AlertCircle, CheckCircle2} from "lucide-react";

export const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-24 right-6 z-[110] flex items-center gap-3 p-5 rounded-2xl shadow-2xl backdrop-blur-md border animate-in slide-in-from-right duration-300 ${
            type === 'success'
                ? 'bg-green-500/20 border-green-500/50 text-green-900'
                : 'bg-red-500/20 border-red-500/50 text-red-900'
        }`}>
            {type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            <p className="font-black text-sm">{message}</p>
        </div>
    );
};
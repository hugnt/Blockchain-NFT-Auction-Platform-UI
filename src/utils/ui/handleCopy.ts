
import { toast, ToastContainer } from 'react-toastify';
export const handleCopy = async (text:string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!", {
            position: "bottom-right",  
        });
    } catch (error) {
      toast.error("Failed to copy to clipboard!", {
        position: "bottom-right",  
    });
    }
  };

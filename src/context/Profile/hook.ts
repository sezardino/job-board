import { useCreateContext } from "@/hooks";
import { ProfileContext } from ".";

export const useProfileContext = () => useCreateContext(ProfileContext);

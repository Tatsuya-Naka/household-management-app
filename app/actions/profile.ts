"use server";

import { auth } from "@/auth";
import ProfileSchema from "@/schemas/profile";

interface ProfileState {
  errors: {
    name?: string[];
    icon?: string[];
    _form?: string[];
  },
  success?: {
    isSuccess: boolean;
    message: string;
  }
}

interface UpdateProfileProps {
  type: string;
  local: string;
}

export async function updateProfile({ type, local }: UpdateProfileProps, formState: ProfileState, formData: FormData): Promise<ProfileState> {
  "use server";
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["Invalid Access"]
      }
    }
  }

  const validatedFields = ProfileSchema.safeParse({
    name: formData.get("name"),
    currency: type,
    location: local,
    icon: formData.get("icon"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, currency, location, icon } = validatedFields.data!;

  console.log({ name: name });
  console.log({ currency: currency });
  console.log({ location: location });
  console.log({ icon: icon });

  return {
    errors: {},
    success: {
      isSuccess: true,
      message: "Profile updated successfully",
    }
  }
}
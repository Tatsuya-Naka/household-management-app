"use server";

import { auth } from "@/auth";
import { api } from "@/lib/apiClient";

interface NLPCommunicationApiState {
  errors: {
    _state?: string[];
  },
  success: {
    isSuccess: boolean;
    message?: string;
    data?: string[];
  }
}

interface NLPCommunicationApiProps {
  text: string;
}

export default async function NLPCommunicationApi({ text }: NLPCommunicationApiProps): Promise<NLPCommunicationApiState> {
  "use server";
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _state: ["Invalid access"]
      },
      success: {
        isSuccess: false
      }
    }
  }

  try {
    const response = await api.post('api/nlp/', { text: text });
    console.log({response: response})
    const { data: {items: result} } = response.data;

    return {
      errors: {},
      success: {
        isSuccess: true,
        message: "success",
        data: result
      }
    }

  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _state: [err.message]
        },
        success: {
          isSuccess: false
        }
      }
    } else {
      return {
        errors: {
          _state: ["Something wrong"]
        },
        success: {
          isSuccess: false
        }
      }
    }
  }

  return {
    errors: {},
    success: {
      isSuccess: true,
      message: "success"
    }
  }
}
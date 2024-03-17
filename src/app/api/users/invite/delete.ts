import { CancelInviteResponse } from "@/services/server/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const deleteCancelInvite = async (req: NextRequest) => {
  const data = await req.json();

  try {
    // TODO: implement cancel invite

    return NextResponse.json({ success: true } as CancelInviteResponse, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Can't cancel invite", error },
      { status: 500 }
    );
  }
};

import { ChipProps } from "@nextui-org/react";

export const stateTournamentColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  paused: "warning",
  cancelled: "danger",
};

export const stateUserColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  inactive: "danger",
};

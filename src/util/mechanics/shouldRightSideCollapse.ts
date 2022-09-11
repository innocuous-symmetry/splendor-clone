import { UIState } from "../types";

export const shouldRightSideCollapse = (UICollapse: UIState) => {
    for (let slice of Object.keys(UICollapse)) {
        if (slice === "playerUICollapsed") continue;
        if (!UICollapse[slice as keyof UIState]) {
            return true;
        }
    }

    return false;
}
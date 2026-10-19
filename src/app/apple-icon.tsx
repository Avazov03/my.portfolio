import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const markSvg = readFileSync(join(process.cwd(), "public/brand/avazov-mark.svg"));
const markDataUrl = `data:image/svg+xml;base64,${markSvg.toString("base64")}`;

/** Apple touch icon — same gold planet mark as the header logo. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse canvas does not support next/image
      // eslint-disable-next-line @next/next/no-img-element
      <img src={markDataUrl} width={180} height={180} alt="" />
    ),
    { ...size },
  );
}

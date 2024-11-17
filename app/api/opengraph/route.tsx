import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // const hasTitle = searchParams.has("title");
    // const title = hasTitle ? searchParams.get("title") : "No Cap";

    // const hasDescription = searchParams.has("description");
    // const description = hasDescription
    //   ? searchParams.get("description")
    //   : "Ici et nulle part ailleurs.";

    const fontData = await fetch(
      new URL("../../../public/font/Renogare-Regular.otf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const imageDataBuffer = await fetch(
      new URL("../../../public/logo/Logo_NoCapR_white.png", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const imageData = `data:image/png;base64,${Buffer.from(
      imageDataBuffer
    ).toString("base64")}`;

    const bgDataBuffer = await fetch(
      new URL("../../../public/images/nocap.jpg", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const backgroundImage = `data:image/jpeg;base64,${Buffer.from(
      bgDataBuffer
    ).toString("base64")}`;

    return new ImageResponse(
      (
        <div tw="flex flex-col h-full w-full items-center justify-center">
          <div
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            tw=" flex items-center justify-center gap-12 w-full"
          >
            <div tw="flex flex-col md-flex-row w-full py-12 px-4 items-center justify-between p-10">
              <img width={170} height={35} src={imageData} />
              {/* <h1
                style={{ fontFamily: "Renogare" }}
                tw="text-3xl text-gray-900 font-bold tracking-widest uppercase renogare"
              >
                {title}
              </h1> */}
              <p tw="text-white">Ici et nulle part ailleurs.</p>
            </div>
          </div>
        </div>
      ),
      {
        fonts: [{ name: "Renogare", data: fontData }],
        width: 1200,
        height: 630,
      }
    );
  } catch (error: any) {
    return new Response("Echec lors de la génération de l'open graph", {
      status: 500,
    });
  }
}

import { generateFeedXml } from "@src/utils/feed";

export async function GET() {
  const xml = generateFeedXml();
  
  return new Response(xml)
}
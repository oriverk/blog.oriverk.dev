import urlJoin from "url-join"

export async function GET() { 
  const origin = process.env.NEXT_PUBLIC_BLOG_PATH || '';
  const sitemap = urlJoin(origin, 'sitemap.xml');
  const robots = `User-agent: *
    Allow: /
    Sitemap: ${sitemap}
    Host: ${origin}`;
  return new Response(robots)
}